import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTodos } from './Api/todos'
import { FaTruckLoading } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Foooter from './Foooter';


const Todo = () => {
  const { user } = useAuth()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(Date);

  const { todos, isLoading, completedTodo, saveTodos, deleteTodo } = useTodos()

  const handleSaveTodos = () => {
    saveTodos({ title, description, dueDate })
    setDueDate(Date)
    setDescription("")
    setTitle("")
  }


  return (
    <>
    
      <header>
      <Link to='/home'>
                      <h1 className="text-indigo-500 text-center text-xl md:text-4xl font-serif font-bold underline h-20 pt-10 pb-20 cursor-pointer">
                        Book<span className="text-red-500">A</span>Bed
                      </h1>
                    </Link>
      </header>
    <div className='bg-indigo-500 flex justify-center sm:p-5 min-h-screen w-full'>
      {
        isLoading && (
          <div className='w-full fixed top-0 left-0 flex justify-center items-center  min-h-screen bg-indigo-500/40'>
            <h1 className='animate-pulse duration-200 ease-in-out text-3xl flex items-center gap-3 font-semibold text-white'><FaTruckLoading />Loading...</h1>
          </div>
        )

      }

      <div className='bg-white rounded-xl w-2/3 p-5 sm:p-14 max-md:w-full max-lg:w-3/4 m-2 flex flex-col items-center py-5 mb-16'>

        <h1 className='text-4xl sm:text-2xl md:text-3xl  lg:text-5xl p-4 font-light text-neutral-500 mr-auto'>Welcome back</h1>
        <span className='text-7xl sm:text-3xl md:text-5xl  lg:text-7xl p-4 text-neutral-800 font-bold  mr-auto'>{user.firstName}</span>


        <div className='rounded-xl my-8 w-full p-6 mx-auto space-y-2 shadow-xl shadow-stone-500/50'>
          <div className="flex-col space-y-4 items-center justify-center ">
            <div className="relative">
              <h2 className='text-sm text-indigo-500'>
                Title
              </h2>

              <input
                type="text"
                className="border-b border-gray-300 py-1 text-xl w-full  focus:border-b-2 focus:border-indigo-500 transition-colors focus:outline-none peer bg-inherit"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="relative">
              <h2 className='text-sm text-indigo-500'>
                Description
              </h2>

              <textarea
                type="text"
                className="border-b border-gray-300 py-1 text-xl w-full focus:border-b-2 focus:border-indigo-500 transition-colors focus:outline-none peer bg-inherit"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <input className='ml-auto rounded-xl  focus:outline-none 
                    text-indigo-500
                    mx-auto p-1 text-lg'
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />

          </div>
        </div>

        <button
          className='transition ease-in-out delay-100 hover:scale-110  text-xl duration-300
                bg-neutral-900 text-white px-8 py-2 rounded-xl font-semibold mx-auto'
          onClick={handleSaveTodos}
        >
          Add new Todo
        </button>


        {
          todos.map((todo, index) => {
            const localDate = new Date(todo.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            return (
              <div key={index} className='flex flex-col my-8
                      w-4/5 border-2 rounded-2xl mx-2 border-zinc p-2'>

                <div className='flex flex-row'>
                  <h2 className="text-sm">{localDate}</h2>
                  <span className='ml-auto text-red-600 
                          text-2xl font-extrabold hover:cursor-pointer' onClick={() => deleteTodo(todo._id)}>X</span>
                </div>
                <h2 className="font-bold text-3xl">{todo.title}</h2>
                <p className='mt-2 text-xl font-light'>{todo.description}</p>
                <input
                  type='checkbox'
                  onChange={() => completedTodo(todo._id)}
                  checked={todo.completed}
                  className='w-4 h-4 my-2 rounded-xl'
                />

              </div>
            );
          })
        }

      </div>
      <ToastContainer />
    </div>
    <Foooter />
    </>
  )
};

export default Todo; 