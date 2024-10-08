import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK, GET_TASKS } from "../../gql/taskQueries";
import { TextField, Button } from "@mui/material";
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
        refetchQueries: [GET_TASKS],
      });
      setTasks((prevTasks) => [...prevTasks, { ...variables }]);
      setTaskTitle("");
    }
  };

  return (
    <div>
      <TextField
        label="New Task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        variant="outlined"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        size="large"
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
