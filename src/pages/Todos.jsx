import React, { useState } from "react";
import Note from "../components/Note";
import CreateArea from "../components/createTodo";

function App() {
  const [obj, setObj] = useState([{ title: "hello", content: "Bitch" }]);

  function addNote(inputObj) {
    setObj((preval) => {
      return [...preval, inputObj];
    });
  }
  function deletes(id) {
    setObj((preval) => {
      preval.filter((obj, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <CreateArea add={addNote} />
      {obj.map((noteitem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteitem.title}
            content={noteitem.content}
            del={deletes}
          />
        );
      })}
    </div>
  );
}

export default App;
