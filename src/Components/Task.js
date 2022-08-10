import React, { useState } from "react";
import "./Task.css";
import Tasks from "./Tasks";
import { v4 as uuidv4 } from "uuid";

const Task = () => {
  const [data, setData] = useState("");
  const [todos, setTodos] = useState([]);
  const [activeIds,setActiveIds]=useState([]);
  const [visibleTasks,setVisibleTasks]=useState([]);

  function InputChangeHandler(e) {
    setData(e.target.value);
  }

  function InputHandler(e) {
    if (e.key === "Enter") {
      let taskId=uuidv4();
      setTodos([...todos, { id: taskId, text: data }]);
      setActiveIds([...activeIds,taskId]);
      setVisibleTasks([...visibleTasks,{id:taskId, text:data}]);
      setData("");
    }
  }

  function DeleteTaskHandler(id) {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((todo) => todo.id !== id);
      setActiveIds(activeIds.filter((curr)=>curr!==id))
      setVisibleTasks(visibleTasks.filter((curr)=>curr.id!==id));
      return newTodos;
    });
  }

  function showActiveTask(){
    setVisibleTasks(todos.filter((curr)=>activeIds.includes(curr.id)));
  }

  function showCompletedTask(){
    setVisibleTasks(todos.filter((curr)=>!activeIds.includes(curr.id)));
  }

  function showAllTask(){
    setVisibleTasks(todos);
  }
  function EditHandler(newtext,id){
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((obj) => {
        if (obj.id === id) return { ...obj, text: newtext };
        else return obj;
      });
      return newTodos;
    });
    setVisibleTasks((prevTodos) => {
      const newTodos = prevTodos.map((obj) => {
        if (obj.id === id) return { ...obj, text: newtext };
        else return obj;
      });
      return newTodos;
    });
  }
  return (
    <div id="container">
      <h1 className="todos"><i>Todos</i></h1>
      <input
        id="input"
        value={data}
        placeholder="Enter Your Task..."
        onChange={InputChangeHandler}
        onKeyPress={InputHandler}
      />
      <div id="list_div" style={{display:"flex",flexDirection:"column"}}>
        {visibleTasks.map((todoDetail) => (
          <Tasks
          key={todoDetail.id}
          id={todoDetail.id}
          onDelete={DeleteTaskHandler}
          activeIds={activeIds}
          setActiveIds={setActiveIds}
          completeState={!activeIds.includes(todoDetail.id)}
          onEdit={EditHandler}
        >
          {todoDetail.text}
        </Tasks>
          
        ))}
        {todos.length==0?"":<div style={{display:"flex",flexDirection:"row",justifyContent: "space-between",marginTop:"10px"}}>
          <p className="items">{activeIds.length} Items left</p>
          <button className="button" onClick={showAllTask}>All</button>
          <button className="button" onClick={showActiveTask}>Active</button>
          <button className="button" onClick={showCompletedTask}>Completed</button>
          </div>}
      </div>
    </div>
  );
};

export default Task;
