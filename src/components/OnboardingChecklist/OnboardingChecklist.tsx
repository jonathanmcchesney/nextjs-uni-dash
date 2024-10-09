"use client";
import React, { useEffect, useState } from "react";
import TaskList from "../TaskList/TaskList";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import AddTask from "../AddTask/AddTask";
import { ITask } from "@/types/task";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/gql/taskQueries";
import { Skeleton } from "@mui/material";

const OnboardingChecklist = ({
  userId,
}: {
  userId: string;
}) => {
  const [currentTasks, setCurrentTasks] = useState<ITask[]>([]);

  const { data } = useQuery(GET_TASKS, {
    variables: { userId },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data?.getTasks) {
      setCurrentTasks(data.getTasks);
    }
  }, [data]);

  return (
    <div>
      <ProgressTracker tasks={currentTasks} />
      {data ? (
        <TaskList tasks={currentTasks} setTasks={setCurrentTasks} />
      ) : (
        <Skeleton />
      )}
      <AddTask userId={userId} setTasks={setCurrentTasks} />
    </div>
  );
};

export default OnboardingChecklist;
