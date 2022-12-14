import { get, post } from "../../services/api";
import {
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAILURE,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILURE,
} from "./Room.action.constants";

export async function addRooms(baseURL, data, dispatch) {
  dispatch({ type: ADD_ROOM_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/add-rooms"}`, data);
  if (response) {
    dispatch({ type: ADD_ROOM_SUCCESS, payload: response?.data.result });
    getRooms(baseURL, dispatch);
  }
  if (error) {
    dispatch({ type: ADD_ROOM_FAILURE });
  }
  return { response, error };
}

export async function getRooms(baseURL, dispatch) {
  dispatch({ type: GET_ROOM_REQUEST });
  const { error, response } = await get(`${baseURL}`, `${"/get-rooms"}`);
  if (response) {
    dispatch({ type: GET_ROOM_SUCCESS, payload: response?.data.result });
  }
  if (error) {
    dispatch({ type: GET_ROOM_FAILURE });
  }
  return { response, error };
}

export async function deleteRoomRequest(baseURL, data, dispatch) {
  const { error, response } = await post(
    `${baseURL}`,
    `${"/delete-room"}`,
    data
  );
  if (response) {
    getRooms(baseURL, dispatch);
    console.log("response", response);
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}
