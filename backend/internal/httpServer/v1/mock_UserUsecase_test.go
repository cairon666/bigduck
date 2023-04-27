// Code generated by mockery v2.20.0. DO NOT EDIT.

package v1

import (
	userusecase "backend/internal/domain/usecases/userusecase"
	context "context"

	mock "github.com/stretchr/testify/mock"
)

// MockUserUsecase is an autogenerated mock type for the UserUsecase type
type MockUserUsecase struct {
	mock.Mock
}

type MockUserUsecase_Expecter struct {
	mock *mock.Mock
}

func (_m *MockUserUsecase) EXPECT() *MockUserUsecase_Expecter {
	return &MockUserUsecase_Expecter{mock: &_m.Mock}
}

// DeleteByID provides a mock function with given fields: ctx, dto
func (_m *MockUserUsecase) DeleteByID(ctx context.Context, dto userusecase.DeleteByIDRequest) error {
	ret := _m.Called(ctx, dto)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, userusecase.DeleteByIDRequest) error); ok {
		r0 = rf(ctx, dto)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockUserUsecase_DeleteByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'DeleteByID'
type MockUserUsecase_DeleteByID_Call struct {
	*mock.Call
}

// DeleteByID is a helper method to define mock.On call
//   - ctx context.Context
//   - dto userusecase.DeleteByIDRequest
func (_e *MockUserUsecase_Expecter) DeleteByID(ctx interface{}, dto interface{}) *MockUserUsecase_DeleteByID_Call {
	return &MockUserUsecase_DeleteByID_Call{Call: _e.mock.On("DeleteByID", ctx, dto)}
}

func (_c *MockUserUsecase_DeleteByID_Call) Run(run func(ctx context.Context, dto userusecase.DeleteByIDRequest)) *MockUserUsecase_DeleteByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(userusecase.DeleteByIDRequest))
	})
	return _c
}

func (_c *MockUserUsecase_DeleteByID_Call) Return(_a0 error) *MockUserUsecase_DeleteByID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockUserUsecase_DeleteByID_Call) RunAndReturn(run func(context.Context, userusecase.DeleteByIDRequest) error) *MockUserUsecase_DeleteByID_Call {
	_c.Call.Return(run)
	return _c
}

// ReadByID provides a mock function with given fields: ctx, dto
func (_m *MockUserUsecase) ReadByID(ctx context.Context, dto userusecase.ReadByIDRequest) (userusecase.ReadByIDResponse, error) {
	ret := _m.Called(ctx, dto)

	var r0 userusecase.ReadByIDResponse
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, userusecase.ReadByIDRequest) (userusecase.ReadByIDResponse, error)); ok {
		return rf(ctx, dto)
	}
	if rf, ok := ret.Get(0).(func(context.Context, userusecase.ReadByIDRequest) userusecase.ReadByIDResponse); ok {
		r0 = rf(ctx, dto)
	} else {
		r0 = ret.Get(0).(userusecase.ReadByIDResponse)
	}

	if rf, ok := ret.Get(1).(func(context.Context, userusecase.ReadByIDRequest) error); ok {
		r1 = rf(ctx, dto)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MockUserUsecase_ReadByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ReadByID'
type MockUserUsecase_ReadByID_Call struct {
	*mock.Call
}

// ReadByID is a helper method to define mock.On call
//   - ctx context.Context
//   - dto userusecase.ReadByIDRequest
func (_e *MockUserUsecase_Expecter) ReadByID(ctx interface{}, dto interface{}) *MockUserUsecase_ReadByID_Call {
	return &MockUserUsecase_ReadByID_Call{Call: _e.mock.On("ReadByID", ctx, dto)}
}

func (_c *MockUserUsecase_ReadByID_Call) Run(run func(ctx context.Context, dto userusecase.ReadByIDRequest)) *MockUserUsecase_ReadByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(userusecase.ReadByIDRequest))
	})
	return _c
}

func (_c *MockUserUsecase_ReadByID_Call) Return(_a0 userusecase.ReadByIDResponse, _a1 error) *MockUserUsecase_ReadByID_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *MockUserUsecase_ReadByID_Call) RunAndReturn(run func(context.Context, userusecase.ReadByIDRequest) (userusecase.ReadByIDResponse, error)) *MockUserUsecase_ReadByID_Call {
	_c.Call.Return(run)
	return _c
}

// UpdateByID provides a mock function with given fields: ctx, dto
func (_m *MockUserUsecase) UpdateByID(ctx context.Context, dto userusecase.UpdateByIDRequest) error {
	ret := _m.Called(ctx, dto)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, userusecase.UpdateByIDRequest) error); ok {
		r0 = rf(ctx, dto)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockUserUsecase_UpdateByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'UpdateByID'
type MockUserUsecase_UpdateByID_Call struct {
	*mock.Call
}

// UpdateByID is a helper method to define mock.On call
//   - ctx context.Context
//   - dto userusecase.UpdateByIDRequest
func (_e *MockUserUsecase_Expecter) UpdateByID(ctx interface{}, dto interface{}) *MockUserUsecase_UpdateByID_Call {
	return &MockUserUsecase_UpdateByID_Call{Call: _e.mock.On("UpdateByID", ctx, dto)}
}

func (_c *MockUserUsecase_UpdateByID_Call) Run(run func(ctx context.Context, dto userusecase.UpdateByIDRequest)) *MockUserUsecase_UpdateByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(userusecase.UpdateByIDRequest))
	})
	return _c
}

func (_c *MockUserUsecase_UpdateByID_Call) Return(_a0 error) *MockUserUsecase_UpdateByID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockUserUsecase_UpdateByID_Call) RunAndReturn(run func(context.Context, userusecase.UpdateByIDRequest) error) *MockUserUsecase_UpdateByID_Call {
	_c.Call.Return(run)
	return _c
}

type mockConstructorTestingTNewMockUserUsecase interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockUserUsecase creates a new instance of MockUserUsecase. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockUserUsecase(t mockConstructorTestingTNewMockUserUsecase) *MockUserUsecase {
	mock := &MockUserUsecase{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
