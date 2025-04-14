import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

function TurnosTable({ turnos }) {
  const [pageSize, setPageSize] = useState(10);
  
  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'primary';
      case 'completado': return 'success';
      case 'cancelado': return 'error';
      case 'reprogramado': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cliente', headerName: 'Cliente', width: 180 },
    { field: 'servicio', headerName: 'Servicio', width: 200 },
    { 
      field: 'fechaHora', 
      headerName: 'Fecha y Hora', 
      width: 200,
      valueFormatter: (params) => moment(params.value).format('LLL')
    },
    { 
      field: 'duracion', 
      headerName: 'Duración', 
      width: 120,
      valueFormatter: (params) => `${params.value || 30} min.`
    },
    { 
      field: 'estado', 
      headerName: 'Estado', 
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value || 'Pendiente'} 
          color={getEstadoColor(params.value)} 
          size="small" 
        />
      )
    },
    { 
      field: 'notas', 
      headerName: 'Notas', 
      width: 250 
    }
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Tabla de Turnos
      </Typography>
      <Box sx={{ height: 'calc(100% - 40px)', width: '100%' }}>
        <DataGrid
          rows={turnos}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default TurnosTable;