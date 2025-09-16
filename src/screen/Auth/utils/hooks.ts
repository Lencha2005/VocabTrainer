import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store';

// Використовується для типізованого dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Використовується для типізованого useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
