// Code generated by mockery v2.20.0. DO NOT EDIT.

package userusecase

import (
	context "context"

	models "backend/internal/domain/models"
	mock "github.com/stretchr/testify/mock"
)

// MockUserService is an autogenerated mock type for the UserService type
type MockUserService struct {
	mock.Mock
}

type MockUserService_Expecter struct {
	mock *mock.Mock
}

func (_m *MockUserService) EXPECT() *MockUserService_Expecter {
	return &MockUserService_Expecter{mock: &_m.Mock}
}

// DeleteByID provides a mock function with given fields: ctx, id
func (_m *MockUserService) DeleteByID(ctx context.Context, id string) error {
	ret := _m.Called(ctx, id)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, string) error); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockUserService_DeleteByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'DeleteByID'
type MockUserService_DeleteByID_Call struct {
	*mock.Call
}

// DeleteByID is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
func (_e *MockUserService_Expecter) DeleteByID(ctx interface{}, id interface{}) *MockUserService_DeleteByID_Call {
	return &MockUserService_DeleteByID_Call{Call: _e.mock.On("DeleteByID", ctx, id)}
}

func (_c *MockUserService_DeleteByID_Call) Run(run func(ctx context.Context, id string)) *MockUserService_DeleteByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *MockUserService_DeleteByID_Call) Return(_a0 error) *MockUserService_DeleteByID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockUserService_DeleteByID_Call) RunAndReturn(run func(context.Context, string) error) *MockUserService_DeleteByID_Call {
	_c.Call.Return(run)
	return _c
}

// ReadByID provides a mock function with given fields: ctx, id
func (_m *MockUserService) ReadByID(ctx context.Context, id string) (models.User, error) {
	ret := _m.Called(ctx, id)

	var r0 models.User
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (models.User, error)); ok {
		return rf(ctx, id)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) models.User); ok {
		r0 = rf(ctx, id)
	} else {
		r0 = ret.Get(0).(models.User)
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, id)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MockUserService_ReadByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ReadByID'
type MockUserService_ReadByID_Call struct {
	*mock.Call
}

// ReadByID is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
func (_e *MockUserService_Expecter) ReadByID(ctx interface{}, id interface{}) *MockUserService_ReadByID_Call {
	return &MockUserService_ReadByID_Call{Call: _e.mock.On("ReadByID", ctx, id)}
}

func (_c *MockUserService_ReadByID_Call) Run(run func(ctx context.Context, id string)) *MockUserService_ReadByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *MockUserService_ReadByID_Call) Return(_a0 models.User, _a1 error) *MockUserService_ReadByID_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *MockUserService_ReadByID_Call) RunAndReturn(run func(context.Context, string) (models.User, error)) *MockUserService_ReadByID_Call {
	_c.Call.Return(run)
	return _c
}

// UpdateByID provides a mock function with given fields: ctx, id, data
func (_m *MockUserService) UpdateByID(ctx context.Context, id string, data map[string]interface{}) error {
	ret := _m.Called(ctx, id, data)

	var r0 error
	if rf, ok := ret.Get(0).(func(context.Context, string, map[string]interface{}) error); ok {
		r0 = rf(ctx, id, data)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// MockUserService_UpdateByID_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'UpdateByID'
type MockUserService_UpdateByID_Call struct {
	*mock.Call
}

// UpdateByID is a helper method to define mock.On call
//   - ctx context.Context
//   - id string
//   - data map[string]interface{}
func (_e *MockUserService_Expecter) UpdateByID(ctx interface{}, id interface{}, data interface{}) *MockUserService_UpdateByID_Call {
	return &MockUserService_UpdateByID_Call{Call: _e.mock.On("UpdateByID", ctx, id, data)}
}

func (_c *MockUserService_UpdateByID_Call) Run(run func(ctx context.Context, id string, data map[string]interface{})) *MockUserService_UpdateByID_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string), args[2].(map[string]interface{}))
	})
	return _c
}

func (_c *MockUserService_UpdateByID_Call) Return(_a0 error) *MockUserService_UpdateByID_Call {
	_c.Call.Return(_a0)
	return _c
}

func (_c *MockUserService_UpdateByID_Call) RunAndReturn(run func(context.Context, string, map[string]interface{}) error) *MockUserService_UpdateByID_Call {
	_c.Call.Return(run)
	return _c
}

type mockConstructorTestingTNewMockUserService interface {
	mock.TestingT
	Cleanup(func())
}

// NewMockUserService creates a new instance of MockUserService. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewMockUserService(t mockConstructorTestingTNewMockUserService) *MockUserService {
	mock := &MockUserService{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
