import React from "react";
import { useMutation } from "@apollo/client";
import { TOGGLE_TASK_COMPLETION } from "../../gql/taskQueries";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ITask } from "@/types/task";

const TaskList = ({
  tasks,
  setTasks,
}: {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const [toggleTaskCompletion] = useMutation(TOGGLE_TASK_COMPLETION);

  const handleToggle = (taskId: string) => {
    toggleTaskCompletion({
      variables: { id: taskId },
    });
    setTasks((prevTasks) =>
      prevTasks?.map((prevTask) =>
        prevTask?.id === taskId
          ? { ...prevTask, completed: !prevTask.completed }
          : prevTask
      )
    );
  };

  return (
    <List>
      {tasks?.map((task: any) => (
        <ListItem key={task.id} dense>
          <>
            <ListItemIcon>
              <Checkbox
                data-testid={`checkbox-${task.id}`}
                checked={task.completed}
                onClick={() => handleToggle(task.id)}
              />
            </ListItemIcon>
            <ListItemText
              data-testid={`task-title-${task.id}`}
              primary={task.title}
            />
          </>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
