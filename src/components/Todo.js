import React, { useEffect, useRef, useState } from "react";
import "../App.css";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState(false);
  const inputRef = useRef(null);

  if (!data) {
    const todo = localStorage.getItem("todoList");
    const completed = localStorage.getItem("completedList");
    if (todo !== null && todo.length > 0) setTodoList(todo.split(","));
    if (completed != null && completed.length > 0)
      setCompletedList(completed.split(","));

    setData(true);
  }

  useEffect(() => {
    localStorage.setItem("todoList", todoList);
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem("completedList", completedList);
  }, [completedList]);

  const onChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (event.keyCode === 13 && input != "") {
      setTodoList((item) => [...item, input]);
      setInput("");
      inputRef.current.value = "";
    }
  };

  const removeHandler = (index) => {
    setCompletedList([todoList[index], ...completedList]);
    setTodoList((item) => item.filter((val, key) => key != index));
  };

  const resetHandler = () => {
    setTodoList([]);
    setInput("");
    inputRef.current.value = "";
    setCompletedList([]);
    localStorage.removeItem("todoList");
    localStorage.removeItem("completedList");
  };

  return (
    <div>
      <h1 className="heading1">TODO App</h1>
      <div className="input-box">
        <input
          className="input"
          placeholder="Type here"
          onKeyDown={onKeyDownHandler}
          onChange={onChangeHandler}
          ref={inputRef}
        ></input>
        <button name="Reset" className="reset-button" onClick={resetHandler}>
          Reset
        </button>
      </div>
      <div className="list">
        {todoList?.map((item, idx) => {
          return (
            <div className="item" key={idx} onClick={() => removeHandler(idx)}>
              {item}
            </div>
          );
        })}
        {completedList?.map((item, idx) => {
          return (
            <div className="completed-item item" key={idx}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
