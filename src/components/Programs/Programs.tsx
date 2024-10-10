"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ICourse } from "@/types/course";

const Programs = ({ programs }: { programs: any[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const theme = useTheme();

  const handleOpen = (course: any) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  return (
    <Box>
      {programs.map((program: any) => (
        <Paper
          elevation={3}
          key={program.id}
          sx={{ padding: 4, marginBottom: 4 }}
        >
          <Typography
            data-testid={`program-name-${program.id}`}
            variant="h5"
            gutterBottom
          >
            {program.name}
          </Typography>

          <List>
            {program.courses.map((course: any) => (
              <ListItem
                component={Button}
                onClick={() => handleOpen(course)}
                key={course.id}
              >
                <ListItemText
                  data-testid={`program-${program.id}-course-title-${course.id}`}
                  primary={course.title}
                  secondary={`Credits: ${course.credits}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            p: 4,
            width: "500px",
            boxShadow: 24,
            borderRadius: "8px",
          }}
        >
          {selectedCourse && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography
                  data-testid={`modal-course-title-${selectedCourse.id}`}
                  variant="h5"
                  gutterBottom
                >
                  {selectedCourse.title}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Course Description
                </Typography>
                <Typography
                  variant="body1"
                  data-testid={`modal-course-description-${selectedCourse.id}`}
                  sx={{ mb: 2 }}
                >
                  {selectedCourse.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Credits
                </Typography>
                <Typography
                  data-testid={`modal-course-credits-${selectedCourse.id}`}
                  variant="body1"
                >
                  {selectedCourse.credits}
                </Typography>
              </Box>

              <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: "100%" }}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Programs;
