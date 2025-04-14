import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

function TurnosCalendar({ turnos }) {
  // Convertir turnos al formato requerido por FullCalendar
  const events = turnos.map(turno => ({
    id: turno.id,
    title: `${turno.cliente || 'Cliente'} - ${turno.servicio || 'Servicio'}`,
    start: turno.fechaHora,
    end: moment(turno.fechaHora).add(turno.duracion || 30, 'minutes').toISOString(),
    backgroundColor: turno.estado === 'completado' ? '#4caf50' : 
                   turno.estado === 'cancelado' ? '#f44336' : '#2196f3',
    borderColor: turno.estado === 'completado' ? '#4caf50' : 
               turno.estado === 'cancelado' ? '#f44336' : '#2196f3',
    extendedProps: {
      cliente: turno.cliente,
      servicio: turno.servicio,
      estado: turno.estado,
      notas: turno.notas
    }
  }));

  const handleEventClick = (info) => {
    alert(`
      Cliente: ${info.event.extendedProps.cliente}
      Servicio: ${info.event.extendedProps.servicio}
      Estado: ${info.event.extendedProps.estado}
      Fecha: ${moment(info.event.start).format('LLL')}
      Notas: ${info.event.extendedProps.notas || 'N/A'}
    `);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Calendario de Turnos
      </Typography>
      <Box sx={{ height: 'calc(100% - 40px)' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }}
          locale="es"
          slotMinTime="07:00:00"
          slotMaxTime="21:00:00"
          allDaySlot={false}
        />
      </Box>
    </Box>
  );
}

export default TurnosCalendar;