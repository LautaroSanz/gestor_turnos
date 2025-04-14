import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Tab, Tabs, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TurnosCalendar from './TurnosCalendar';
import TurnosTable from './TurnosTable';
import TurnosTimeline from './TurnosTimeline';
import api from '../services/api';

function Dashboard() {
  const [turnos, setTurnos] = useState([]);
  const [medico, setMedico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const { medicoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Cargar información del médico
        if (medicoId) {
          const medicos = await api.getMedicos();
          const medicoSeleccionado = medicos.find(m => m.id === parseInt(medicoId));
          if (medicoSeleccionado) {
            setMedico(medicoSeleccionado);
          }
        }
        
        // Cargar turnos filtrados por médico
        const turnosData = await api.getTurnos(medicoId);
        setTurnos(turnosData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [medicoId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleVolverClick = () => {
    navigate('/');
  };

  if (loading) return <Container><Typography>Cargando datos...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleVolverClick}
          variant="outlined"
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          {medico ? `Turnos: ${medico.nombre}` : 'Sistema de Gestión de Turnos'}
        </Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="visualización de turnos">
          <Tab label="Calendario" />
          <Tab label="Tabla" />
          <Tab label="Línea de Tiempo" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 500,
              overflow: 'auto' 
            }}
          >
            {tabValue === 0 && <TurnosCalendar turnos={turnos} />}
            {tabValue === 1 && <TurnosTable turnos={turnos} />}
            {tabValue === 2 && <TurnosTimeline turnos={turnos} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;