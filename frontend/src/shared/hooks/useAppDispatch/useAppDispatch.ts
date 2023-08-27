import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../app/providers/storeProvider';

export const useAppDispatch: () => AppDispatch = useDispatch;
