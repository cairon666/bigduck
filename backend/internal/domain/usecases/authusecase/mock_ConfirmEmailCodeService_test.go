// Code generated by mockery v2.20.0. DO NOT EDIT.

package authusecase

import (
	context "context"

	mock "github.com/stretchr/testify/mock"
)

// MockConfirmEmailCodeService is an autogenerated mock type for the ConfirmEmailCodeService type
type MockConfirmEmailCodeService struct {
	mock.Mock
}

type MockConfirmEmailCodeService_Expecter struct {
	mock *mock.Mock
}

func (_m *MockConfirmEmailCodeService) EXPECT() *MockConfirmEmailCodeService_Expecter {
	return &MockConfirmEmailCodeService_Expecter{mock: &_m.Mock}
}

// Get provides a mock function with given fields: ctx, idUser
func (_m *MockConfirmEmailCodeService) Get(ctx context.Context, idUser string) (string, error) {
	ret := _m.Called(ctx, idUser)

	var r0 string
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (string, error)); ok {
		return rf(ctx, idUser)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) string); ok {
		r0 = rf(ctx, idUser)
	} else {
		r0 = ret.Get(0).(string)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, idUser)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MockConfirmEmailCodeService_Get_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Get'
type MockConfirmEmailCodeService_Get_Call struct {
	*mock.Call
}

// Get is a helper method to define mock.On call
//   - ctx context.Context
//   - idUser string
func (_e *MockConfirmEmailCodeService_Expecter) Get(ctx interface{}, idUser interface{}) *MockConfirmEmailCodeService_Get_Call {
	return &MockConfirmEmailCodeService_Get_Call{Call: _e.mock.On("Get", ctx, idUser)}
}

func (_c *MockConfirmEmailCodeService_Get_Call) Run(run func(ctx context.Context, idUser string)) *MockConfirmEmailCodeService_Get_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *MockConfirmEmailCodeService_Get_Call) Return(_a0 string, _a1 error) *MockConfirmEmailCodeService_Get_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *MockConfirmEmailCodeService_Get_Call) RunAndReturn(run func(context.Context, string) (string, error)) *MockConfirmEmailCodeService_Get_Call {
	_c.Call.Return(run)
	return _c
}

// Set provides a mock function with given fields: ctx, idUser, code
func (_m *MockConfirmEmailCodeService) Set(ctx context.Context, idUser string, code string) error {
	ret := _m.Called(ctx, idUser, code)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, string, string) error); ok {
		r0 = rf(ctx, idUser, code)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockConfirmEmailCodeService_Set_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Set'
type MockConfirmEmailCodeService_Set_Call struct {
	*mock.Call
}

// Set is a helper method to define mock.On call
//   - ctx context.Context
//   - idUser string
//   - code string
func (_e *MockConfirmEmailCodeService_Expecter) Set(ctx interface{}, idUser interface{}, code interface{}) *MockConfirmEmailCodeService_Set_Call {
	return &MockConfirmEmailCodeService_Set_Call{Call: _e.mock.On("Set", ctx, idUser, code)}
}

func (_c *MockConfirmEmailCodeService_Set_Call) Run(run func(ctx context.Context, idUser string, code string)) *MockConfirmEmailCodeService_Set_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string), args[2].(string))
	})
	return _c
}

func (_c *MockConfirmEmailCodeService_Set_Call) Return(_a0 error) *MockConfirmEmailCodeService_Set_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockConfirmEmailCodeService_Set_Call) RunAndReturn(run func(context.Context, string, string) error) *MockConfirmEmailCodeService_Set_Call {
	_c.Call.Return(run)
	return _c
}

type mockConstructorTestingTNewMockConfirmEmailCodeService interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockConfirmEmailCodeService creates a new instance of MockConfirmEmailCodeService. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockConfirmEmailCodeService(t mockConstructorTestingTNewMockConfirmEmailCodeService) *MockConfirmEmailCodeService {
	mock := &MockConfirmEmailCodeService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
