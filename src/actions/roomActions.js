import ApiService from '../service/ApiService';
import {
  FETCH_ROOM_DETAILS,
  UPDATE_ROOM,
  DELETE_ROOM,
  FETCH_ALL_ROOMS,
  ADD_ROOM,
  FETCH_ROOM_TYPES,
} from './types';

export const fetchRoomDetails = (roomId) => async (dispatch) => {
  try {
    const response = await ApiService.getRoomById(roomId);
    dispatch({ type: FETCH_ROOM_DETAILS, payload: response.room });
  } catch (error) {
    console.error('Error fetching room details:', error.message);
  }
};

export const updateRoom = (roomId, formData) => async (dispatch) => {
  try {
    const response = await ApiService.updateRoom(roomId, formData);
    if (response.statusCode === 200) {
      dispatch({ type: UPDATE_ROOM, payload: response.room });
    }
  } catch (error) {
    console.error('Error updating room:', error.message);
  }
};

export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    const response = await ApiService.deleteRoom(roomId);
    if (response.statusCode === 200) {
      dispatch({ type: DELETE_ROOM, payload: roomId });
    }
  } catch (error) {
    console.error('Error deleting room:', error.message);
  }
};

export const fetchAllRooms = () => async (dispatch) => {
  try {
    const response = await ApiService.getAllRooms();
    dispatch({ type: FETCH_ALL_ROOMS, payload: response.roomList });
  } catch (error) {
    console.error('Error fetching rooms:', error.message);
  }
};

export const addRoom = (formData) => async (dispatch) => {
  try {
    const response = await ApiService.addRoom(formData);
    if (response.statusCode === 200) {
      dispatch({ type: ADD_ROOM, payload: response.room });
    }
  } catch (error) {
    console.error('Error adding room:', error.message);
  }
};

export const fetchRoomTypes = () => async (dispatch) => {
  try {
    const types = await ApiService.getRoomTypes();
    dispatch({ type: FETCH_ROOM_TYPES, payload: types });
  } catch (error) {
    console.error('Error fetching room types:', error.message);
  }
};
