import React from "react";

function Note(props) {
  return (
    <div className="note" style={{ position: "relative" }}>
      <div style={{ float: "right", color: "red" }}>
        {props.dueDate.slice(1, 11)}
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <h4 className="mb-5">Sub To Dos:-</h4>
      {props.array.map((obj, index) => {
        return (
          <div style={{ display: "flex" }} key={index}>
            <h4 style={{ marginRight: "5px" }}>{index + 1}) </h4>
            <p
              onClick={() => {
                obj.state = !obj.state;
                props.propsUpdate();
              }}
              style={obj.state ? {} : { textDecoration: "line-through" }}
            >
              {obj.todosValue}
            </p>
          </div>
        );
      })}
      {props.btn ? (
        <button onClick={props.setComplete}>{props.btn}</button>
      ) : null}
    </div>
  );
}

export default Note;
