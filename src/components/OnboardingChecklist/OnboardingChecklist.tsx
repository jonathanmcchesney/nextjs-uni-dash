"use client";
import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import AddTask from "../AddTask/AddTask";
import { ITask } from "@/types/task";

const OnboardingChecklist = ({
  tasks,
  userId,
}: {
  tasks: ITask[];
  userId: string;
}) => {
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks);

  return (
    <div>
      <ProgressTracker tasks={currentTasks} />
      <TaskList
        tasks={currentTasks}
        setTasks={setCurrentTasks}
      />
      <AddTask userId={userId} setTasks={setCurrentTasks} />
    </div>
  );
};

export default OnboardingChecklist;
