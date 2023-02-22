import { FetchNotifiesRequest, ReadAllNotifiesRequest, notifyTypes } from '../types';

export const fetchNotifies = (): FetchNotifiesRequest => ({
    type: notifyTypes.FETCH_NOTIFIES,
});

export const readAllNotifies = (): ReadAllNotifiesRequest => ({
    type: notifyTypes.READ_ALL_NOTIFIES,
});
