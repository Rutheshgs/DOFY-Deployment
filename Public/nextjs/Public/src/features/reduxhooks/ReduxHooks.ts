import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();