export enum notifyTypes {
    FETCH_NOTIFIES = 'FETCH_NOTIFIES',
}

export interface FetchNotifiesRequest {
    type: typeof notifyTypes.FETCH_NOTIFIES;
}
