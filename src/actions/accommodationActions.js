import {
    addAccommodation,
    getAccommodations,
    updateAccommodation,
    deleteAccommodation,
    getAccommodationById,
  } from "../services/FirebaseService";

  export const fetchAccommodations = () => async (dispatch) => {
    dispatch({ type: "FETCH_ACCOMMODATIONS_REQUEST" });
    try {
      const accommodations = await getAccommodations();
      dispatch({ type: "FETCH_ACCOMMODATIONS_SUCCESS", payload: accommodations });
    } catch (error) {
      dispatch({ type: "FETCH_ACCOMMODATIONS_FAILURE", error });
    }
  };

  export const createAccommodation = (accommodation) => async (dispatch) => {
    try {
      const id = await addAccommodation(accommodation);
      dispatch({ type: "CREATE_ACCOMMODATION_SUCCESS", payload: { id, ...accommodation } });
    } catch (error) {
      dispatch({ type: "CREATE_ACCOMMODATION_FAILURE", error });
    }
  };

  export const updateAccommodationAction = (id, updatedData) => async (dispatch) => {
    try {
      await updateAccommodation(id, updatedData);
      dispatch({ type: "UPDATE_ACCOMMODATION_SUCCESS", payload: { id, ...updatedData } });
    } catch (error) {
      dispatch({ type: "UPDATE_ACCOMMODATION_FAILURE", error });
    }
  };

  export const deleteAccommodationAction = (id) => async (dispatch) => {
    try {
      await deleteAccommodation(id);
      dispatch({ type: "DELETE_ACCOMMODATION_SUCCESS", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_ACCOMMODATION_FAILURE", error });
    }
  };
  