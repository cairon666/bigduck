package authhelper

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/google/uuid"
)

func ForTestingNewHelper(t *testing.T) *helper {
	t.Helper()

	return NewAuthHelper(Props{
		Issuer:     "",
		Private:    []byte{1, 2, 3, 4, 5, 6, 7, 8, 9},
		TTLAccess:  time.Hour,
		TTLRefresh: time.Hour,
	})
}

func emptyHandler() http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {

	}
}

func NewRequestWithJWT(jwt string) *http.Request {
	req := httptest.NewRequest(http.MethodGet, "http://testing", nil)
	if jwt != "" {
		req.Header.Set(AuthorizationHeaderKey, "Bearer "+jwt)
	}

	return req
}

func TestMiddlewareWOClaims(t *testing.T) {
	t.Parallel()

	helper := ForTestingNewHelper(t)
	handleToTest := helper.AuthorizationMiddleware(emptyHandler())

	req := NewRequestWithJWT("")
	resp := httptest.NewRecorder()

	handleToTest.ServeHTTP(resp, req)

	if resp.Code != http.StatusOK {
		t.Fatalf("should be 200, expect: %d", resp.Code)
	}
}

func TestMiddlewareRandomJWT(t *testing.T) {
	t.Parallel()

	helper := ForTestingNewHelper(t)
	handleToTest := helper.AuthorizationMiddleware(emptyHandler())

	resp := httptest.NewRecorder()
	req := NewRequestWithJWT("some random jwt")

	handleToTest.ServeHTTP(resp, req)

	if resp.Code != http.StatusUnauthorized {
		t.Fatalf("should be 401, expect: %d", resp.Code)
	}
}

func TestMiddlewareWithClaims(t *testing.T) {
	t.Parallel()

	helper := ForTestingNewHelper(t)
	id := uuid.New().String()
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims := GetClaims(r.Context())
		if claims == nil {
			t.Fatalf("should find claims")
		}

		if claims.IDUser != id {
			t.Fatalf("id should be %s, expect %s", id, claims.IDUser)
		}
	})
	handleToTest := helper.AuthorizationMiddleware(next)

	access, _, err := helper.NewTokens(id)
	if err != nil {
		t.Fatal(err)
	}

	req := NewRequestWithJWT(access)
	resp := httptest.NewRecorder()

	handleToTest.ServeHTTP(resp, req)

	if resp.Code != http.StatusOK {
		t.Fatalf("should be 200, expect: %d", resp.Code)
	}
}
