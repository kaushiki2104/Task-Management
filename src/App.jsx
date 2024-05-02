import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(
      `${activeCard} is going to place ${position} in ${status} column`
    );
    if (activeCard === null || activeCard === undefined) return;
    const taskMove = tasks[activeCard];
    const updatedTask = tasks.filter((task, index) => index !== activeCard);
    updatedTask.splice(position, 0, { ...taskMove, status: status });
    setTasks(updatedTask);
  };

  return (
    <div className="container">
      
      <div className="row " style={{marginTop:"3%"}}>
      <TaskForm setTasks={setTasks} taskList={tasks} />
</div>
<div className="row">
  <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>
</div>
      
    </div>
  );
};

export default App;
