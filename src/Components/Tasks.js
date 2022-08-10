import React, { useState } from "react";
import "./Tasks.css";
import { GiCancel } from "react-icons/gi";

const Tasks = (props) => {

  const [isComplete, setIsComplete] = useState(props.completeState);

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState("");

  const input = (
    <input
      id="edit_input"
      type="text"
      value={data}
      onChange={inputChange}
      onKeyPress={inputHandler}
    />
  );
  function inputChange(e) {
    setData(e.target.value);
  }

  function inputHandler(e) {
    if (e.key === "Enter") {
      props.onEdit(e.target.value, props.id);
      setData("");
      setEdit(false);
    }
  }
  function RemoveHandler() {
    props.onDelete(props.id);
  }

  function CompleteHandler() {
    setIsComplete(!isComplete);
    if(isComplete){
      props.setActiveIds([...props.activeIds,props.id]);
    }else{
      props.setActiveIds(props.activeIds.filter((curr)=>curr!==props.id));
    }
  }
  function EditHandler() {
    setEdit(true);
    setData(props.children);
  }
  return (
    // <div>
    <div id="item_div">
        <input
          id="complete_checkbox"
          type="checkbox"
          onChange={CompleteHandler}
          checked={isComplete}
        />
        <div id="task_div" onDoubleClick={EditHandler} className={`${isComplete ? "complete" : ""}`}>
          {edit ? input : props.children}
        </div>
        <div id="delete_div" onClick={RemoveHandler}>
          <i className="fa-solid fa-xmark"></i>
        </div>
    </div>
  );
};

export default Tasks;
