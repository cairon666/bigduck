import { FetchNotifiesRequest, notifyTypes } from '../types';

export const fetchNotifies = (): FetchNotifiesRequest => ({
    type: notifyTypes.FETCH_NOTIFIES,
});
