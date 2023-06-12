import { createAction } from '@reduxjs/toolkit';

import { HTTPError, fetchUserDataRequest, fetchUserDataResponse } from '../../Api';

export const FetchUserDataAction = createAction<fetchUserDataRequest>('FetchUserDataAction');
export const FetchUserDataSuccessAction = createAction<fetchUserDataResponse>('FetchUserDataSuccessAction');
export const FetchUserDataFinallyAction = createAction('FetchUserDataFinallyAction');
export const FetchUserDataErrorAction = createAction<HTTPError>('FetchUserDataFinallyAction');
