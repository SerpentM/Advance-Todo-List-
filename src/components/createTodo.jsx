import React, { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
function CreateArea(props) {
  const [todaysDate, setTodaysDay] = useState("");
  useEffect(() => {
    const todays = new Date();

    setTodaysDay(
      todays.getMonth() +
        1 +
        "/" +
        todays.getDate() +
        "/" +
        todays.getFullYear()
    );
  }, []);
  return (
    <div>
      <form
        className="addTodos"
        style={{ backgroundColor: "#F9F7F7" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          name="title"
          placeholder="Title"
          onChange={props.handleInput}
          value={props.inputObj.title}
          className="mb-5"
        />
        <textarea
          name="description"
          placeholder="Description..."
          rows="3"
          onChange={props.handleInput}
          value={props.inputObj.description}
          style={{ fontSize: "medium" }}
        />
        <div style={{ display: "flex", marginBottom: "25px" }} className="mb-5">
          <input
            name="toDos"
            placeholder="Add to do's"
            onChange={props.setValues}
            style={{ fontSize: "medium" }}
            value={props.todosValue}
          />
          <AddCircleIcon
            className="addCircle"
            onClick={() => {
              props.setValue();
            }}
          ></AddCircleIcon>
        </div>
        {props.todosArray.map((obj, index) => {
          return (
            <div
              style={{
                display: "flex",
                marginBottom: "10px",
              }}
              key={index}
            >
              <h3
                style={{ marginRight: "10px" }}
                onClick={() => {
                  props.deleteItems(index);
                }}
              >
                <DeleteForeverIcon></DeleteForeverIcon>
              </h3>
              <h4>{obj.todosValue}</h4>
            </div>
          );
        })}
        <div style={{ width: "60%", marginLeft: "5px" }} className="mb-5">
          <DatePickerComponent
            placeholder="Enter Due Date"
            onChange={props.handleInput}
            name="dueDate"
            min={todaysDate}
            className="datepicker"
            format="dd-MMM-yyyy"
          ></DatePickerComponent>
        </div>
        <button onClick={props.todosUpdate}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
