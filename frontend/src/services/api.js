import axios from 'axios';

// Configuración base de axios
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Crear una instancia de axios con configuración personalizada
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptores para manejar errores globalmente
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Puedes personalizar el manejo de diferentes códigos de error aquí
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(`API Error: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('API Error: No se recibió respuesta del servidor');
    } else {
      // Algo salió mal al configurar la petición
      console.error(`API Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Datos de prueba para médicos
const MOCK_MEDICOS = [
  { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología", imagen: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, nombre: "Dra. María González", especialidad: "Pediatría", imagen: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, nombre: "Dr. Carlos Rodríguez", especialidad: "Dermatología", imagen: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, nombre: "Dra. Laura Martínez", especialidad: "Ginecología", imagen: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: 5, nombre: "Dr. Roberto Sánchez", especialidad: "Traumatología", imagen: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, nombre: "Dra. Ana López", especialidad: "Oftalmología", imagen: "https://randomuser.me/api/portraits/women/6.jpg" }
];

// Servicio API
const api = {
  // Médicos
  getMedicos: async () => {
    try {
      const response = await apiClient.get('/medicos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo médicos:', error);
      // Devolver datos de prueba en caso de error
      console.info('Usando datos de prueba para médicos');
      return MOCK_MEDICOS;
    }
  },
  
  getMedicoById: async (id) => {
    try {
      const response = await apiClient.get(`/medicos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo médico ${id}:`, error);
      // Buscar en datos de prueba
      const medicoMock = MOCK_MEDICOS.find(m => m.id === parseInt(id));
      if (medicoMock) return medicoMock;
      throw error;
    }
  },
  
  // Turnos
  getTurnos: async (medicoId = null) => {
    try {
      let url = '/turnos';
      if (medicoId) {
        url += `?medicoId=${medicoId}`;
      }
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo turnos:', error);
      throw error;
    }
  },
  
  getTurnosByMedico: async (medicoId) => {
    try {
      const response = await apiClient.get(`/turnos/medico/${medicoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo turnos del médico ${medicoId}:`, error);
      throw error;
    }
  },
  
  getTurnoById: async (id) => {
    try {
      const response = await apiClient.get(`/turnos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error obteniendo turno ${id}:`, error);
      throw error;
    }
  },
  
  createTurno: async (turnoData) => {
    try {
      const response = await apiClient.post('/turnos', turnoData);
      return response.data;
    } catch (error) {
      console.error('Error creando turno:', error);
      throw error;
    }
  },
  
  updateTurno: async (id, turnoData) => {
    try {
      const response = await apiClient.put(`/turnos/${id}`, turnoData);
      return response.data;
    } catch (error) {
      console.error(`Error actualizando turno ${id}:`, error);
      throw error;
    }
  },
  
  deleteTurno: async (id) => {
    try {
      const response = await apiClient.delete(`/turnos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error eliminando turno ${id}:`, error);
      throw error;
    }
  },
  
  // Turnos especiales
  generarTurnos: async (datos) => {
    try {
      const response = await apiClient.post('/turnos/generar', datos);
      return response.data;
    } catch (error) {
      console.error('Error generando turnos:', error);
      throw error;
    }
  },
  
  cancelarTurnosLibres: async (medicoId, fecha) => {
    try {
      const response = await apiClient.delete(`/turnos/cancelar/${medicoId}/${fecha}`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelando turnos libres para médico ${medicoId} en fecha ${fecha}:`, error);
      throw error;
    }
  },
  
  // Especialidades
  getEspecialidades: async () => {
    try {
      const response = await apiClient.get('/especialidades');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especialidades:', error);
      // Podríamos agregar datos de prueba aquí si fuera necesario
      throw error;
    }
  }
};

export default api;