import React, { useEffect, useState } from "react";

import "./TaskForm.css";
import Tag from "./Tag";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalFooter } from "react-bootstrap";



const TaskForm = ({ setTasks, taskList }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    task_desc: "",
    status: "todo",
    tags: [],
  });

  const [show, setShow] = useState(false)

  useEffect(() => {
    if (taskList.length == 0) {
      setShow(true)
    }
  }, [taskList]);

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    if (!taskData.task.match(/^[A-Za-z\s]+$/)) {
      alert('Title should only contain alphabets!');
      return;
    }

    if (taskData.task_desc.length < 25) {
      alert('Description should be at least 25 characters long!');
      return;
    }
    setTasks((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      tesk_desc: "",
      status: "todo",
      tags: [],
    });
    setShow(false);
  };

  const openModal = () => {
    setShow(true);
  }


  return (
    <>
      <div className="container">
        <div className="col text-end">
          <Button className="task_submit" onClick={openModal}>
            + Add Task
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>  <header className="app_header">
          <div className="container">
            {/* task head */}
            <div className="row">
              <div className="col text-center">
                <input
                  type="text"
                  name="task"
                  value={taskData.task}
                  className="form-control"
                  placeholder="Enter your task"
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            {/* description*/}
            <div className="row">
              <div className="col text-center">
                <input
                  type="text"
                  name="task_desc"
                  value={taskData.task_desc}
                  className="form-control"
                  placeholder="Enter your description"
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />

            {/* tags  */}
            <div className="row">
              <div className="col text-center">
                <div>
                  <Tag
                    tagName="HTML"
                    selectTag={selectTag}
                    selected={checkTag("HTML")}
                  />
                  <Tag
                    tagName="CSS"
                    selectTag={selectTag}
                    selected={checkTag("CSS")}
                  />
                  <Tag
                    tagName="JavaScript"
                    selectTag={selectTag}
                    selected={checkTag("JavaScript")}
                  />
                  <Tag
                    tagName="React"
                    selectTag={selectTag}
                    selected={checkTag("React")}
                  />
                </div>
              </div>
            </div>
            <br />

            {/* select  */}
            <div className="row text-center">
              <div className="col-4">
                <h4>Status :</h4>
              </div>
              <div className="col-8 text-start">
                <div>
                  <select
                    name="status"
                    value={taskData.status}
                    className="task_status"
                    onChange={handleChange}
                  >
                    <option value="todo">To do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            </div>



          </div>

        </header>
          {/* Button */}
        </Modal.Body>
        <ModalFooter>
          <div className="row">

            <div className="col-6 text-end">
              <button className="btn btn-danger" onClick={() => { setShow(false) }} >Cancle</button>
            </div>

            <div className="col-6">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>



        </ModalFooter>
      </Modal>


    </>
  );
};

export default TaskForm;
