export enum notifyTypes {
    FETCH_NOTIFIES = 'FETCH_NOTIFIES',
    READ_ALL_NOTIFIES = 'READ_ALL_NOTIFIES',
}

export interface FetchNotifiesRequest {
    type: typeof notifyTypes.FETCH_NOTIFIES;
}

export interface ReadAllNotifiesRequest {
    type: typeof notifyTypes.READ_ALL_NOTIFIES;
}
