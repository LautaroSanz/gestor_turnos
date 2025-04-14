import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, FormControl, InputLabel, 
  Select, MenuItem, Divider
} from '@mui/material';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

function TurnosTimeline({ turnos }) {
  const [view, setView] = useState('day');
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    prepareChartData();
  }, [turnos, view]);
  
  const prepareChartData = () => {
    if (!turnos || turnos.length === 0) {
      setChartData([]);
      return;
    }
    
    let data = [];
    
    if (view === 'day') {
      // Agrupar por horas del día
      const hourData = {};
      
      turnos.forEach(turno => {
        const hour = moment(turno.fechaHora).format('HH:00');
        if (!hourData[hour]) {
          hourData[hour] = { hour, count: 0 };
        }
        hourData[hour].count++;
      });
      
      data = Object.values(hourData).sort((a, b) => 
        moment(a.hour, 'HH:00').diff(moment(b.hour, 'HH:00'))
      );
    } else if (view === 'week') {
      // Agrupar por día de la semana
      const weekData = {
        'Domingo': { name: 'Domingo', count: 0 },
        'Lunes': { name: 'Lunes', count: 0 },
        'Martes': { name: 'Martes', count: 0 },
        'Miércoles': { name: 'Miércoles', count: 0 },
        'Jueves': { name: 'Jueves', count: 0 },
        'Viernes': { name: 'Viernes', count: 0 },
        'Sábado': { name: 'Sábado', count: 0 }
      };
      
      turnos.forEach(turno => {
        const day = moment(turno.fechaHora).format('dddd');
        if (weekData[day]) {
          weekData[day].count++;
        }
      });
      
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      data = days.map(day => weekData[day]);
    } else if (view === 'month') {
      // Agrupar por día del mes
      const monthData = {};
      
      turnos.forEach(turno => {
        const day = moment(turno.fechaHora).format('DD');
        if (!monthData[day]) {
          monthData[day] = { day: parseInt(day), count: 0 };
        }
        monthData[day].count++;
      });
      
      data = Object.values(monthData).sort((a, b) => a.day - b.day);
    }
    
    setChartData(data);
  };
  
  const handleViewChange = (event) => {
    setView(event.target.value);
  };
  
  const renderTooltip = (props) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <Typography variant="body2">
            {view === 'day' ? `Hora: ${data.hour}` : 
             view === 'week' ? `Día: ${data.name}` : 
             `Día del mes: ${data.day}`}
          </Typography>
          <Typography variant="body2" color="primary">
            Total de turnos: {data.count}
          </Typography>
        </Box>
      );
    }
    
    return null;
  };
  
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Distribución de Turnos
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="view-select-label">Vista</InputLabel>
          <Select
            labelId="view-select-label"
            id="view-select"
            value={view}
            onChange={handleViewChange}
            label="Vista"
          >
            <MenuItem value="day">Por Hora</MenuItem>
            <MenuItem value="week">Por Día de la Semana</MenuItem>
            <MenuItem value="month">Por Día del Mes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ height: 'calc(100% - 80px)', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={view === 'day' ? 'hour' : view === 'week' ? 'name' : 'day'} 
              angle={-45} 
              textAnchor="end" 
              height={60}
            />
            <YAxis />
            <Tooltip content={renderTooltip} />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Cantidad de Turnos" 
              fill="#8884d8" 
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default TurnosTimeline;