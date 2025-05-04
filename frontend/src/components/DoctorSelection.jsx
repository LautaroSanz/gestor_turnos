import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardMedia, CardActionArea, Box, Skeleton, Chip, Button 
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
        console.error(err);
      }
    };
    
    fetchMedicos();
  }, []);
  
  const handleSelectDoctor = (medicoId) => {
    navigate(`/dashboard/${medicoId}`);
  };
  
  // Renderizar esqueletos durante la carga
  const renderSkeletons = () => {
    return Array(6).fill().map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="rectangular" height={180} animation="wave" />
          <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={30} width="80%" animation="wave" />
            <Skeleton variant="text" width="60%" animation="wave" />
          </CardContent>
        </Card>
      </Grid>
    ));
  };
  
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sistema de Gestión de Turnos
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Seleccione un médico para ver sus turnos
        </Typography>
      </Box>
      
      {error && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Reintentar
          </Button>
        </Box>
      )}
      
      {!error && (
        <Grid container spacing={3}>
          {loading ? (
            renderSkeletons()
          ) : (
            medicos.length > 0 ? (
              medicos.map((medico) => (
                <Grid item key={medico.id} xs={12} sm={6} md={4} lg={3}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8
                      }
                    }}
                  >
                    <CardActionArea 
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                      onClick={() => handleSelectDoctor(medico.id)}
                    >
                      <CardMedia
                        component="img"
                        height="220"
                        image={medico.imagen || `https://ui-avatars.com/api/?name=${encodeURIComponent(medico.nombre)}&background=random&size=256`}
                        alt={medico.nombre}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h5" component="h2" sx={{ mb: 1 }}>
                          {medico.nombre} {medico.apellido_doctor || ''}
                        </Typography>
                        <Chip 
                          label={medico.especialidad}
                          color="primary"
                          size="small"
                          sx={{ alignSelf: 'flex-start', mt: 'auto' }}
                        />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No se encontraron médicos disponibles
                </Typography>
              </Box>
            )
          )}
        </Grid>
      )}
    </Container>
  );
}

export default DoctorSelection;