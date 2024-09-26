import { FETCH_ADMIN_NAME } from '../actions/types';

const initialState = {
  adminName: '',
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMIN_NAME:
      return { ...state, adminName: action.payload };
    default:
      return state;
  }
};