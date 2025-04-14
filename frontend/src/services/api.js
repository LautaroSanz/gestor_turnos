import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = {

  
  getMedicos: async () => {
    try {
      const response = await axios.get(`${API_URL}/medicos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medicos:', error);
      // Si la API de médicos no existe, devolvemos datos de prueba
      return [
        { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología", imagen: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: 2, nombre: "Dra. María González", especialidad: "Pediatría", imagen: "https://randomuser.me/api/portraits/women/2.jpg" },
        { id: 3, nombre: "Dr. Carlos Rodríguez", especialidad: "Dermatología", imagen: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: 4, nombre: "Dra. Laura Martínez", especialidad: "Ginecología", imagen: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: 5, nombre: "Dr. Roberto Sánchez", especialidad: "Traumatología", imagen: "https://randomuser.me/api/portraits/men/5.jpg" },
        { id: 6, nombre: "Dra. Ana López", especialidad: "Oftalmología", imagen: "https://randomuser.me/api/portraits/women/6.jpg" }
      ];
    }
  },


  getTurnos: async (medicoId = null) => {
    try {

      let url = `${API_URL}/turnos`;
      if (medicoId) {
        url += `?medicoId=${medicoId}`;
      }

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