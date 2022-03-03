import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function CreateArea(props) {
  const [inputObj, setInputText] = useState({
    title: "",
    description: "",
    todos: [],
  });
  const [todosValue, setValues] = useState("");
  const [todosArray, setTodosValue] = useState([]);
  function handleInput(evt) {
    const { name, value } = evt.target;
    setInputText((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }
  return (
    <div>
      <form
        className="addTodos"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          name="title"
          placeholder="Title"
          onChange={handleInput}
          value={inputObj.title}
        />
        <textarea
          name="description"
          placeholder="Description..."
          rows="3"
          onChange={handleInput}
        />
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            name="toDos"
            placeholder="Add to do's"
            onChange={(e) => {
              setValues(e.target.value);
            }}
            value={todosValue}
          />
          <AddCircleIcon
            style={{ color: "pink", fontSize: "40px" }}
            onClick={() => {
              setTodosValue((oldArray) => [...oldArray, todosValue]);
              setValues("");
            }}
          ></AddCircleIcon>
        </div>
        {todosArray.map((obj, index) => {
          return (
            <div style={{ display: "flex", marginBottom: "10px" }} key={index}>
              <h3 style={{ marginRight: "10px" }}>
                <DeleteForeverIcon></DeleteForeverIcon>
              </h3>
              <h4>{obj}</h4>
            </div>
          );
        })}
        <button
          onClick={() => {
            props.add(inputObj);
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
