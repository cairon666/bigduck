import { Notify } from '@/entities/Notify/model/notify';

export interface NotifyScheme {
    notifies: Notify[];
    hasUnViewed: boolean;
    isLoading: boolean;
}
