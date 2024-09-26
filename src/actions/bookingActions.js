import ApiService from '../service/ApiService';
import {
  FETCH_BOOKING_DETAILS,
  CANCEL_BOOKING,
  FETCH_ALL_BOOKINGS,
} from './types';

export const fetchBookingDetails = (bookingCode) => async (dispatch) => {
  try {
    const response = await ApiService.getBookingByConfirmationCode(bookingCode);
    dispatch({ type: FETCH_BOOKING_DETAILS, payload: response.booking });
  } catch (error) {
    console.error('Error fetching booking details:', error.message);
  }
};

export const cancelBooking = (bookingId) => async (dispatch) => {
  try {
    const response = await ApiService.cancelBooking(bookingId);
    if (response.statusCode === 200) {
      dispatch({ type: CANCEL_BOOKING, payload: bookingId });
    }
  } catch (error) {
    console.error('Error canceling booking:', error.message);
  }
};

export const fetchAllBookings = () => async (dispatch) => {
  try {
    const response = await ApiService.getAllBookings();
    dispatch({ type: FETCH_ALL_BOOKINGS, payload: response.bookingList });
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
  }
};