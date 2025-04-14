import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardMedia, CardActionArea, Box, Skeleton, Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function DoctorSelection() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        setLoading(true);
        const data = await api.getMedicos();
        setMedicos(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los médicos');
        setLoading(false);
      }
    };
    
    fetchMedicos();
  }, []);
  
  const handleSelectDoctor = (medicoId) => {
    navigate(`/dashboard/${medicoId}`);
  };
  
  // Renderizar esqueletos de carga
  const renderSkeletons = () => {
    return Array(6).fill().map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="rectangular" height={140} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" />
          </CardContent>
        </Card>
      </Grid>
    ));
  };
  
  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema de Gestión de Turnos
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Seleccione un médico para ver sus turnos
        </Typography>
      </Box>
      
      {error && (
        <Typography color="error" align="center" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={4}>
        {loading ? (
          renderSkeletons()
        ) : (
          medicos.map((medico) => (
            <Grid item key={medico.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardActionArea onClick={() => handleSelectDoctor(medico.id)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={medico.imagen || `https://ui-avatars.com/api/?name=${encodeURIComponent(medico.nombre)}&background=random`}
                    alt={medico.nombre}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {medico.nombre}
                    </Typography>
                    <Chip 
                      label={medico.especialidad}
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default DoctorSelection;