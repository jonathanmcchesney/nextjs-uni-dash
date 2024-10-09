"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { ILocation } from "@/types/location";
import { IClassTimetable } from "@/types/timetaable";

const mockLocations: ILocation[] = [
  {
    label: "A",
    name: "Building A (Classroom)",
    coordinates: { x: "25%", y: "25%" },
    description:
      "Primary building for physics, mathematics and computer science. Your upcoming Math 101 class takes place here.",
  },
  {
    label: "B",
    name: "University Cafeteria",
    coordinates: { x: "65%", y: "40%" },
    description: "Enjoy lunch between classes!",
  },
  {
    label: "C",
    name: "Main Library",
    coordinates: { x: "50%", y: "85%" },
    description: "The main university library.",
  },
];

const classTimetable: IClassTimetable[] = [
  {
    className: "Math 101",
    location: "Building A",
    time: "10:00 AM - 11:30 AM",
  },
  {
    className: "Physics 201",
    location: "Main Library",
    time: "2:00 PM - 3:30 PM",
  },
];

const userLocation: ILocation = {
  label: "You",
  name: "You are here",
  coordinates: { x: "34%", y: "46%" },
  description: "This is your current location.",
};

export default function MockCampusMap() {
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [walkingTime, setWalkingTime] = useState<number | null>(null);

  const getClassLocation = (locationName: string): ILocation | undefined => {
    return mockLocations.find((location) =>
      location.name.includes(locationName)
    );
  };

  const calculateWalkingTime = (start: ILocation, end: ILocation): void => {
    const timeInMinutes =
      Math.abs(mockLocations.indexOf(end) - mockLocations.indexOf(start)) * 5;
    setWalkingTime(timeInMinutes);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
      <Box
        sx={{
          flex: 2,
          padding: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Map
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            minWidth: "22rem",
            height: "400px",
            backgroundImage: `url("/images/mock-campus-map.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        >
          {classTimetable.map((classItem, index) => {
            const classLocation = getClassLocation(classItem.location);
            return (
              classLocation && (
                <Tooltip key={index} title={classItem.className} arrow>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: classLocation.coordinates.y,
                      left: classLocation.coordinates.x,
                      transform: "translate(-50%, -100%)",
                      color: "green",
                    }}
                    onClick={() => {
                      setWalkingTime(null);
                      setSelectedLocation(classLocation);
                    }}
                  >
                    <RoomIcon fontSize="large" />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "100%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {classLocation.label}
                    </Typography>
                  </IconButton>
                </Tooltip>
              )
            );
          })}

          {mockLocations.map((location, index) => (
            <Tooltip key={index} title={location.name} arrow>
              <IconButton
                sx={{
                  position: "absolute",
                  top: location.coordinates.y,
                  left: location.coordinates.x,
                  transform: "translate(-50%, -100%)",
                  color: "red",
                }}
                onClick={() => {
                  setWalkingTime(null);
                  setSelectedLocation(location);
                }}
              >
                <RoomIcon fontSize="large" />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {location.label}
                </Typography>
              </IconButton>
            </Tooltip>
          ))}

          <Tooltip title={userLocation.label} arrow>
            <IconButton
              sx={{
                position: "absolute",
                top: userLocation.coordinates.y,
                left: userLocation.coordinates.x,
                transform: "translate(-50%, -100%)",
                color: "green",
              }}
              onClick={() => {
                setWalkingTime(null);
                setSelectedLocation(userLocation);
              }}
            >
              <RoomIcon fontSize="large" />
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                You
              </Typography>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 4,
          padding: 3,
          borderLeft: "1px solid #ccc",
        }}
      >
        <CardContent>
          <Typography variant="h5">Location Details</Typography>

          {selectedLocation ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                {selectedLocation.label}. {selectedLocation.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {selectedLocation.description}
              </Typography>

              <Button
                variant="contained"
                startIcon={<DirectionsWalkIcon />}
                sx={{ mt: 2 }}
                onClick={() =>
                  calculateWalkingTime(userLocation, selectedLocation)
                }
              >
                Get Walking Directions
              </Button>

              {walkingTime !== null && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Estimated walking time: {walkingTime} minutes
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mt: 3 }}>
              Click on a location on the map to see its details.
            </Typography>
          )}
        </CardContent>
      </Box>
    </Card>
  );
}
