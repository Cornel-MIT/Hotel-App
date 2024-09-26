import {
    FETCH_BOOKING_DETAILS,
    CANCEL_BOOKING,
    FETCH_ALL_BOOKINGS,
  } from '../actions/types';
  
  const initialState = {
    bookingDetails: null,
    bookingList: [],
    success: '',
    error: '',
  };
  
  export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKING_DETAILS:
        return { ...state, bookingDetails: action.payload };
      case CANCEL_BOOKING:
        return {
          ...state,
          bookingList: state.bookingList.filter(
            (booking) => booking.id !== action.payload
          ),
          success: 'Booking canceled successfully.',
        };
      case FETCH_ALL_BOOKINGS:
        return { ...state, bookingList: action.payload };
      default:
        return state;
    }
  };