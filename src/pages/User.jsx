import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateArea from "../components/createTodo";
import Note from "../components/Note";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [todosObjectarray, setTodosObjectArray] = React.useState([]);
  const [todosArray, setTodosValue] = React.useState([]);
  const [todosValue, setValues] = React.useState("");
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [username, setUsername] = React.useState("");
  const userData = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    setUsername(userData.username);
    axios
      .get("http://localhost:7789/api/gettodos", {
        headers: {
          "user-id": userData.id,
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data.todos);
          setTodosObjectArray(res.data.todos);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  React.useEffect(() => {
    auth();
  });

  function auth() {
    axios
      .get("http://localhost:7789/api/auth", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.message, err.status, err.data, err.headers);
        alert("Session Expired");
        navigate("/login");
      });
  }
  async function updatTodosData() {
    await axios
      .post(
        "http://localhost:7789/api/posttodos",
        { todos: todosObjectarray, userDataid: userData.id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  }
  React.useEffect(() => {
    updatTodosData();
    console.log("run");
  }, [todosObjectarray]);
  function handleUpdate() {
    inputObj.todos = todosArray;
    async function run() {
      await setTodosObjectArray((preVal) => {
        return [...preVal, inputObj];
      });
    }
    run().then(() => {
      alert("Item Added");
    });
    setInputText({
      title: "",
      description: "",
      todos: [],
      dueDate: "",
      status: "pending",
    });
    setTodosValue([]);
  }
  const [inputObj, setInputText] = React.useState({
    title: "",
    description: "",
    todos: [],
    dueDate: "",
    status: "pending",
  });
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
    <Box sx={{ width: "100%" }}>
      <header>
        <h3>ToDo's</h3>
        <h3>Welcome {username}</h3>
      </header>
      <Box sx={{ borderBottom: 1, borderColor: "#DBE2EF" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tabs"
        >
          <Tab label="Add Task" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CreateArea
          handleInput={handleInput}
          inputObj={inputObj}
          setValue={() => {
            setTodosValue((oldArray) => [
              ...oldArray,
              { todosValue, state: false },
            ]);
            console.log(todosArray);
            setValues("");
          }}
          todosValue={todosValue}
          setValues={(e) => {
            setValues(e.target.value);
          }}
          todosUpdate={handleUpdate}
          deleteItems={(index) => {
            todosArray.splice(index, 1);
            setTodosValue((prevArray) => [...prevArray]);
          }}
          todosArray={todosArray}
        ></CreateArea>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ width: "100%", height: "auto" }}>
          {todosObjectarray
            .filter((obj) => {
              if (obj.status === "pending") {
                return obj;
              }
            })
            .map((obj, index) => {
              return (
                <Note
                  title={obj.title}
                  content={obj.description}
                  id={index}
                  key={index}
                  array={obj.todos}
                  setComplete={() => {
                    obj.status = "complete";
                    updatTodosData();
                    forceUpdate();
                  }}
                  dueDate={JSON.stringify(obj.dueDate)}
                  btn="Complete"
                ></Note>
              );
            })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{ width: "100%", height: "auto" }}>
          {todosObjectarray
            .filter((obj) => {
              if (obj.status === "complete") {
                return obj;
              }
            })
            .map((obj, index) => {
              return (
                <Note
                  title={obj.title}
                  content={obj.description}
                  id={index}
                  key={index}
                  array={obj.todos}
                  dueDate={JSON.stringify(obj.dueDate)}
                ></Note>
              );
            })}
        </div>
      </TabPanel>
    </Box>
  );
}
