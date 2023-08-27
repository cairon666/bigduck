import { useAppSelector } from '@/shared/hooks';

export const useUserViewer = () => useAppSelector((state) => state.user);
