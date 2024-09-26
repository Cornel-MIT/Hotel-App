import {
    FETCH_ROOM_DETAILS,
    UPDATE_ROOM,
    DELETE_ROOM,
    FETCH_ALL_ROOMS,
    ADD_ROOM,
    FETCH_ROOM_TYPES,
  } from '../actions/types';
  
  const initialState = {
    roomDetails: null,
    roomList: [],
    roomTypes: [],
    success: '',
    error: '',
  };
  
  export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ROOM_DETAILS:
        return { ...state, roomDetails: action.payload };
      case UPDATE_ROOM:
        return {
          ...state,
          roomList: state.roomList.map((room) =>
            room.id === action.payload.id ? action.payload : room
          ),
          success: 'Room updated successfully.',
        };
      case DELETE_ROOM:
        return {
          ...state,
          roomList: state.roomList.filter((room) => room.id !== action.payload),
          success: 'Room deleted successfully.',
        };
      case FETCH_ALL_ROOMS:
        return { ...state, roomList: action.payload };
      case ADD_ROOM:
        return {
          ...state,
          roomList: [...state.roomList, action.payload],
          success: 'Room added successfully.',
        };
      case FETCH_ROOM_TYPES:
        return { ...state, roomTypes: action.payload };
      default:
        return state;
    }
  };
  