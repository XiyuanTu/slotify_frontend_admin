import { configureStore } from '@reduxjs/toolkit';
import { api } from '../app/services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer, { clearCredentials } from '../features/common/authSlice';
import studentReducer from '../features/common/studentSlice';
import slotReducer from '../features/common/slotSlice';
import { isRejectedWithValue } from '@reduxjs/toolkit';

const rtkQueryErrorInterceptor = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // console.warn('We got a rejected action!', action);
    // when token expired
    if (action.payload.status == '401') {
      store.dispatch(clearCredentials());
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    student: studentReducer,
    slot: slotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorInterceptor),
});

setupListeners(store.dispatch);
