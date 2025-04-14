import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = {
  getTurnos: async () => {
    try {
      const response = await axios.get(`${API_URL}/turnos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching turnos:', error);
      throw error;
    }
  },
  
  getTurnoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/turnos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching turno ${id}:`, error);
      throw error;
    }
  },
  
  createTurno: async (turnoData) => {
    try {
      const response = await axios.post(`${API_URL}/turnos`, turnoData);
      return response.data;
    } catch (error) {
      console.error('Error creating turno:', error);
      throw error;
    }
  },
  
  updateTurno: async (id, turnoData) => {
    try {
      const response = await axios.put(`${API_URL}/turnos/${id}`, turnoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating turno ${id}:`, error);
      throw error;
    }
  },
  
  deleteTurno: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/turnos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting turno ${id}:`, error);
      throw error;
    }
  }
};

export default api;