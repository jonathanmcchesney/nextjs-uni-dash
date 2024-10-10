import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressTracker = ({
  tasks,
}: {
  tasks: Array<{ completed: boolean }>;
}) => {
  const totalTasks = tasks?.length || 0;

  const completedTasks = tasks?.filter((task) => task.completed).length || 0;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Box>
      <Typography gutterBottom sx={{ marginBottom: 1 }}>
        Progress
      </Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography gutterBottom sx={{ marginTop: 1 }}>
        {completedTasks} of {totalTasks} tasks completed
      </Typography>
    </Box>
  );
};

export default ProgressTracker;
