package authcontroller

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"backend/internal/domain/usecases/authusecase"
	"github.com/stretchr/testify/mock"
)

func TestLoginHandler_Success(t *testing.T) {
	t.Parallel()

	c, params := NewMockController(t)

	reqData := loginRequest{
		Email:    "example@example.example",
		Password: "12345678",
	}

	usecaseResp := authusecase.LoginResponse{IDUser: "123"}
	refresh := ""
	access := ""

	shouldResp := loginResponse{
		IDUser:      usecaseResp.IDUser,
		AccessToken: access,
	}

	params.AuthUsecase.
		On("Login", mock.Anything, mock.Anything).
		Return(usecaseResp, nil)

	params.AuthHelper.
		On("NewTokens", usecaseResp.IDUser).
		Return(access, refresh, nil)

	params.AuthHelper.
		On("SetRefreshCookie", mock.Anything, refresh).
		Return(nil)

	params.HTTPHelper.
		On("SendJSON", mock.Anything, mock.MatchedBy(func(resp loginResponse) bool {
			return shouldResp == resp
		}), http.StatusOK).
		Return()

	body := bytes.Buffer{}
	_ = json.NewEncoder(&body).Encode(reqData) //nolint:errchkjson

	req := httptest.NewRequest("", "http://example.com", &body)
	w := httptest.NewRecorder()
	c.loginHandler(w, req)

	result := w.Result()
	_ = result.Body.Close()
}
