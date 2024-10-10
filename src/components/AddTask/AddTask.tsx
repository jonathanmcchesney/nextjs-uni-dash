import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK, GET_TASKS } from "../../gql/taskQueries";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "@/types/task";

const AddTask = ({
  setTasks,
  userId,
}: {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  userId: string;
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [addTask] = useMutation(ADD_TASK);

  const handleSubmit = () => {
    if (taskTitle.trim()) {
      const id = uuidv4();
      const variables = { id, title: taskTitle, userId, completed: false };

      addTask({
        variables,
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: { userId },
          },
        ],
      });
      setTasks((prevTasks) => [...prevTasks, { ...variables }]);
      setTaskTitle("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        label="New Task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        size="large"
        disabled={!taskTitle}
        sx={{ borderRadius: "8px", paddingX: 3, whiteSpace: "nowrap" }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;
