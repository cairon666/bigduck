import { ApiError } from '../../_api';

export interface fetchAction<FetchData, SuccessData> {
    data: FetchData;
    onSuccess?: (data: SuccessData) => void;
    onError?: (error: ApiError) => void;
    onEnd?: () => void;
}
