import { useState, useEffect, useMemo, useContext, useCallback, useReducer, useRef } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import TaskButton from "./components/TaskButton";
import Users from "./components/Users";
import { useSelector, useDispatch,} from "react-redux";
import {addTask, deleteTask, toggleTask,} from "./store/taskSlice";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// useReducer
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "RESET": 
      return 0;

    default:
      return state;
  }
}

function AppEx() {

  //api calls - using fetch and .then()
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);
  // useEffect(() => {
  // fetch( "https://jsonplaceholder.typicode.com/users" ) //Send request
  //   .then((response) =>  //Server replied
  //     response.json()   //Convert response into JavaScript object
  //   )
  //   .then((data) => {  //Actual user data
  //     setUsers(data); //Store API data in state
  //   });
  // }, []);


   //api calls - modern way to use async await with useEffect
    useEffect(() => {
    const fetchUsers = async () => {
    const response =
      await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
    const data =
      await response.json();
    setUsers(data);
    setLoading(false);
    };
    fetchUsers();
    }, []);//Run only once when component loads


  // for usecontext
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  // for useLocalStorage
  // const [tasks, setTasks] = useLocalStorage("tasks", []);
  // const addTask = (newTask) => {
  //   const taskObject = { id: Date.now(), text: newTask, completed: false,};
  //   setTasks([...tasks, taskObject]);
  // };
  // // filtering tasks based on search query
  // const deleteTask = (id) => {
  //   const filteredTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(filteredTasks);
  // };
  // // map through tasks and toggle the completed status of the task with the matching id
  // const toggleTask = (id) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === id) {
  //       return {...task, completed: !task.completed, };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // };



  // for useCallback
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);


 


  // useReducer
  const [count, reducerDispatch] = useReducer(reducer, 0);


  //useRef
  const inputRef = useRef(null);

  //redux toolkit
  const tasks = useSelector( (state) => state.tasks.tasks);
  const dispatch = useDispatch();
  //addtask fun
  const handleAddTask =(taskText) => { dispatch( addTask(taskText)); };
  //update task fun
  const handleDeleteTask  = (id) => { dispatch( deleteTask(id)); };
  //toggle task fun
  const handleToggleTask = (id) => { dispatch( toggleTask(id)); };


   // search for useMemo
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");

    return tasks.filter((task) =>
      task.text
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tasks, search]);

  return (
    <div>
      <Navbar />

      {/* <TaskForm addTask={addTask} /> */}
      <TaskForm addTask={handleAddTask} />

      {/* useref used */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
      <button onClick={() => inputRef.current.focus()}> 
              Focus Search </button>

      {/* {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))} */}

     {filteredTasks.map((task) => (
  <TaskCard
    key={task.id}
    task={task}
    deleteTask={handleDeleteTask}
    toggleTask={handleToggleTask}
  />
))}

      <div>
        <h1>Current Theme: {theme}</h1>

        <button onClick={toggleTheme}>
          Change Theme
        </button>
      </div>

      {/* useCallback Example */}
      <TaskButton onClick={handleClick} />

      {/* useReducer Example */}
      <div>
        <h2>useReducer Counter</h2>
        <h3>{count}</h3>

        <button onClick={() => reducerDispatch({ type: "INCREMENT", }) }>
          +
        </button>

        <button onClick={() => reducerDispatch({ type: "DECREMENT", }) }>
          -
        </button>

        <button
          onClick={() => reducerDispatch({ type: "RESET", }) } >
          Reset
        </button>
      </div>


      {/* API Call Example */}
      <h2>Users shown async and await fetch </h2>
      {loading ? (<h2>Loading...</h2>) : (
        users.map((user) => (
          <p key={user.id}>
            {user.name}
          </p>
        ))
      )}
     <Users />

    </div>
  );
}

export default AppEx;