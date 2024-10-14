"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Typography, Card, CardContent, Paper } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SCHEDULE, UPDATE_CLASS } from "../../gql/timetableQueries";

const timeSlots: string[] = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const parseTimeSlot = (timeSlot: string) => {
  const [startTime, endTime] = timeSlot.split(" - ");
  return { startTime, endTime };
};

// TODO - this is a very early implementation of the timetable, i'd like to refactor how the droppable ids are consumed and parsed
function DraggableEvent({ event, index }: { event: any; index: number }) {
  const theme = useTheme();

  const getCategoryColour = (category: string) => {
    switch (category) {
      case "study":
        return theme.palette.mode === "dark" ? "#68a691" : "#c0f0c0";
      case "extracurricular":
        return theme.palette.mode === "dark" ? "#6a75ca" : "#c0c0f0";
      case "class":
      default:
        return theme.palette.mode === "dark" ? "#db6b8e" : "#f0c0c0";
    }
  };

  return (
    <Draggable draggableId={event.id} index={index}>
      {(provided) => (
        <Card
          tabIndex={0}
          data-testid={`draggable-card-${event.id.toLowerCase()}-index`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            marginBottom: "8px",
            cursor: "move",
            backgroundColor: getCategoryColour(event.category),
          }}
        >
          <CardContent sx={{ padding: "10px" }}>
            <Typography variant="body1" fontWeight="bold">
              {event.name}
            </Typography>
            <Typography variant="body2">
              {event.startTime} - {event.endTime}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

function TimeSlot({
  day,
  timeSlot,
  events,
  id,
}: {
  day: string;
  timeSlot: string;
  events: any[];
  id: string;
}) {
  const theme = useTheme();

  return (
    <Droppable droppableId={`${day}|${timeSlot}`}>
      {(provided, snapshot) => (
        <Box
          data-testid={id}
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            height: "110px",
            border: `1px solid ${theme.palette.divider}`,
            padding: "0.5rem",
            backgroundColor: snapshot.isDraggingOver
              ? theme.palette.mode === "dark"
                ? "#333"
                : "#f5f5f5"
              : "transparent",
            overflowY: "auto",
          }}
        >
          {events.map((event, index) => (
            <DraggableEvent key={event.id} event={event} index={index} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}

const Timetable = ({ userId }: { userId: string }) => {
  const theme = useTheme();
  const { data, loading, error } = useQuery(GET_SCHEDULE, {
    variables: { userId },
  });
  const [updateClass] = useMutation(UPDATE_CLASS);
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setSchedule(data.getTimetable);
    }
  }, [data]);

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const [destDay, destTimeSlot] = destination.droppableId.split("|");

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const { startTime, endTime } = parseTimeSlot(destTimeSlot);

    const updatedSchedule = schedule.map((event: any) =>
      event.id === draggableId
        ? { ...event, day: destDay, startTime, endTime }
        : event
    );
    setSchedule(updatedSchedule);

    const movedEvent = schedule.find((event: any) => event.id === draggableId);
    updateClass({
      variables: {
        userId,
        classId: movedEvent.id,
        startTime,
        endTime,
        day: destDay,
      },
    });
  };

  const getEventsForDayAndTime = (day: string, timeSlot: string) => {
    return schedule.filter(
      (event: any) =>
        event.day === day &&
        `${event.startTime} - ${event.endTime}` === timeSlot
    );
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1.5rem",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "#fff",
        color: theme.palette.text.primary,
      }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ minWidth: "110px" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Time
            </Typography>
            {timeSlots.map((time, index) => (
              <Box
                key={time}
                data-testid={`timeslot-${index}`}
                sx={{
                  height: "110px",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                }}
              >
                {time}
              </Box>
            ))}
          </Box>

          {daysOfTheWeek.map((day) => (
            <Box key={day} sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                {day}
              </Typography>
              {timeSlots.map((timeSlot, index) => (
                <TimeSlot
                  key={`${day}:${timeSlot}`}
                  id={`droppable-timeslot-${day.toLowerCase()}-${index}`}
                  day={day}
                  timeSlot={timeSlot}
                  events={getEventsForDayAndTime(day, timeSlot)}
                />
              ))}
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
};

export default Timetable;
