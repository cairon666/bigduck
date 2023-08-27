import { useAppSelector } from '@/shared/hooks';

export const useNotifyViewer = () => useAppSelector((state) => state.notify);
