import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAppointmentsByDate = (date) => {
  return axios.get(`${API_URL}/api/appointments?fecha=${date}`);
};

export const createAppointment = (data) => {
  return axios.post(`${API_URL}/api/appointments`, data);
};
