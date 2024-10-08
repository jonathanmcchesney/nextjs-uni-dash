import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressTracker = ({
  tasks,
}: {
  tasks: Array<{ completed: boolean }>;
}) => {
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((task) => task.completed).length || 0;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <Box>
      <Typography variant="h6">Progress</Typography>
      <LinearProgress variant="determinate" value={progress} />
      <Typography>
        {completedTasks} of {totalTasks} tasks completed
      </Typography>
    </Box>
  );
};

export default ProgressTracker;
