package v1

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"backend/internal/authhelper"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ForTestLoginParams struct {
	reqData    loginRequest
	returnData authusecase.LoginResponse
	returnErr  error
}

func ForTestLogin(t *testing.T, param ForTestLoginParams) *http.Response {
	t.Helper()

	server, params := ForTestingNewServer(t)
	handler := server.router()

	params.AuthUsecase.
		On("Login", mock.Anything, mock.Anything).
		Return(param.returnData, param.returnErr)

	buff := new(bytes.Buffer)
	if err := json.NewEncoder(buff).Encode(param.reqData); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", buff)
	recorded := httptest.NewRecorder()
	handler.ServeHTTP(recorded, req)

	resp := recorded.Result()

	return resp
}

func TestLoginHandlerSuccess(t *testing.T) {
	t.Parallel()

	resp := ForTestLogin(t, ForTestLoginParams{
		reqData: loginRequest{
			Email:    "example@example.example",
			Password: "12345678",
		},
		returnData: authusecase.LoginResponse{
			IDUser: uuid.New().String(),
		},
		returnErr: nil,
	})
	defer resp.Body.Close()

	respData := new(loginResponse)
	if err := json.NewDecoder(resp.Body).Decode(respData); err != nil {
		t.Fatal(err)
	}

	// test cookie
	cookies := resp.Cookies()
	if cookies == nil {
		t.Fatal("should set cookie with refresh token")
	}

	cook, err := authhelper.GetRefreshCookieFromResponse(resp)
	if err != nil || cook == "" {
		t.Fatal("should be not null cookie")
	}
}

func TestLoginHandlerValidate(t *testing.T) {
	t.Parallel()

	reqData := loginRequest{
		Email:    "",
		Password: "",
	}

	reqUsecaseData := authusecase.LoginRequest{
		Email:    reqData.Email,
		Password: reqData.Password,
	}

	returnErr, _ := reqUsecaseData.IsValid().(exceptions.Error)

	resp := ForTestLogin(t, ForTestLoginParams{
		reqData:    reqData,
		returnData: authusecase.LoginResponse{},
		returnErr:  returnErr,
	})
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusBadRequest {
		t.Fatalf("should be %d, expect %d", http.StatusBadRequest, resp.StatusCode)
	}

	var respData exceptions.ValidateError
	if err := json.NewDecoder(resp.Body).Decode(&respData); err != nil {
		t.Fatal(err)
	}

	compareData, _ := returnErr.GetData().(*exceptions.ValidateError)

	// don't check code because he is private field
	if !assert.Equal(t, respData.Details, compareData.Details) ||
		!assert.Equal(t, respData.Message, compareData.Message) {
		t.Fatal("should be equal")
	}
}

// func TestLoginHandlerAlreadyExist(t *testing.T) {
//	t.Skip()
//}
//
// func TestLoginHandlerDecode(t *testing.T) {
//	t.Skip()
//}
