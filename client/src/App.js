import React, { useEffect, useState } from 'react';
import { fetchTodo, createTodo, deleteTodo, getTodoById, UpdateTodo, UpdateTodoStatus } from './state/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [todoField, setTodoField] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  const allTodo = useSelector((state) => state.todo.todo);
  const selectedTodo = useSelector((state) => state.todo.selectedTodo);
  console.log(selectedTodo.length);
  useEffect(() => {
    setTodoField(selectedTodo?.task);
  }, [selectedTodo])
  const handleOnClick = () => {
    if (!todoField) {
      toast.error("Todo is required");
    } else {
      const obj = {
        todoField: todoField,
        dispatch: dispatch
      }
      console.log('obj', obj)
      dispatch(createTodo(obj));
      setTodoField("");
    }
  }
  const handleUpdate = async () => {
    if (!todoField) {
      toast.error("Todo is required");
    } else {
      const obj = {
        id: selectedTodo?._id,
        todoField: todoField,
        dispatch: dispatch
      }
      dispatch(UpdateTodo(obj));
      setTodoField("");
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
          <div className="flex items-center mb-6">
            <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
          </div>
          <div className="relative flex">
            <input type="text" placeholder="What needs to be done today?"
              className="w-full mr-4 px-2 py-3 border rounded outline-none border-grey-600" value={todoField} onChange={(e) => setTodoField(e.target.value)} />
            {
              selectedTodo.length === 0 ?
                <button className="text-white bg-purple-600 border-0 py-2 px-6 focus:outline-none rounded text-lg" onClick={handleOnClick}>Add</button>
                :
                <button className="text-white bg-purple-600 border-0 py-2 px-6 focus:outline-none rounded text-lg" onClick={handleUpdate}>Update</button>

            }
          </div>
          <ul className="list-reset">
            {allTodo && allTodo.length > 0 ? allTodo.map((data) => {
              return (
                <li className="relative cursor-pointer flex items-center justify-between px-2 py-6 border-b" key={data._id}>
                  <div onClick={() => dispatch(UpdateTodoStatus({ id: data?._id, Tododata: data, dispatch: dispatch }))}>
                    <p className={`inline-block mt-1 text-gray-600 ${data.completed === true ? "line-through" : ""}`}>{data.task}</p>
                  </div>
                  <div className='flex'>
                    <button type="button" className=" right-0 flex items-center" onClick={() => dispatch(getTodoById(data._id))}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>

                    </button>
                    <button type="button" className=" right-0 flex items-center" onClick={() => dispatch(deleteTodo(data._id))}>

                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-700" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </li>
              )
            }) : <h1 className='inline-block mt-1 text-gray-600 text-center'>There is no todo</h1>}
          </ul>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className=' mt-1 text-purple-600 text-lg'>Intructions</h1>
          <div className="flex flex-col">
            <p>1: Click on todo text to update the status of todo</p>
            <p>2: Click on edit icon to update the todo</p>
            <p>3: Click on delete icon to delete the todo</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
