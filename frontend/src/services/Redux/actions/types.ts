import { ApiError } from '../../Api';

export interface fetchAction<FetchData, SuccessData> {
    data: FetchData;
    onSuccess?: (data: SuccessData) => void;
    onError?: (error: ApiError) => void;
    onEnd?: () => void;
}
