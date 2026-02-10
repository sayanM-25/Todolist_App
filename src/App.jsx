import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
// import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // const saveToLS = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    // saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:w-[35%] md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] ">
        <h1 className="font-bold text-center text-xl">
          iTask - Manage your todos in one place
        </h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <div className="flex">
            <input
              type="text"
              className="w-full border border-gray-400 rounded-md px-5 py-1"
              onChange={handleChange}
              value={todo}
            />
            <button
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white rounded-md mx-2"
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          id="show"
        />
        <label className="mx-2" htmlFor="show">
          Show finished
        </label>
        <div className="h-px bg-black opacity-20 w-[90%] mx-auto my-2"></div>
        <h1 className="text-xl font-bold">Your todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                      onClick={(e) => handleEdit(e, item.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
