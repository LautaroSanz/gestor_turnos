import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Tab, Tabs } from '@mui/material';
import TurnosCalendar from './TurnosCalendar';
import TurnosTable from './TurnosTable';
import TurnosTimeline from './TurnosTimeline';
import api from '../services/api';

function Dashboard() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        setLoading(true);
        const data = await api.getTurnos();
        setTurnos(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los turnos');
        setLoading(false);
        console.error(err);
      }
    };

    fetchTurnos();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <Typography>Cargando turnos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sistema de Gestión de Turnos
      </Typography>
      
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