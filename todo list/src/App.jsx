import { useEffect, useState } from 'react'
import { MdEditNote } from "react-icons/md";
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { MdDeleteOutline } from "react-icons/md";

import './App.css'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let numtodo=localStorage.getItem("todos")
    if(numtodo){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])

  const [showfinished, setshowfinished] = useState(true)
  
  const savelocal=()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

const toogle=(e)=>{
  setshowfinished(!showfinished)
}

  const handleedit = (e,id) => {
    let ne=todos.filter(item=>{
      return item.id===id
    }
    )
    settodo(ne[0].todo)
    let newT = todos.filter(item => {
      return item.id !== id
    })
    settodos(newT)
    savelocal()
  }
  const handledelete = (e, id) => {

    let newT = todos.filter(item => {
      return item.id !== id
    })
    settodos(newT)
    savelocal()
  }
  const handlecheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    }
    )
    let newT = [...todos];
    newT[index].isCompleted = !newT[index].isCompleted;
    settodos(newT)
    savelocal()
  }
  const changetrig = (e) => {
    settodo(e.target.value)
  }
  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("");
    savelocal()
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-1/2">
      <h1 className="text-center font-bold">WELCOME TO THE TODO APP</h1>
        <div className="addtodo my-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <input onChange={changetrig} value={todo} type="text" className='bg-white w-full rounded-lg px-3 py-1'  />
          <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-400 p-2 py-1 rounded-md text-white hover:bg-violet-600 ' >Save</button>
        </div>
        <input type="checkbox" onChange={toogle} checked={showfinished} /> Show finished
        <h1 className='text-lg font-bold'>My Todos</h1>
        <div className="todos">
          {todos.length===0&& <div className='m-4'> No todos to display</div>}
          {todos.map(item => {


            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2 my-2">
              <div className="flex gap-5">
              <input type="checkbox" name={item.id} onChange={handlecheck} checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              </div>
              <div className="btn flex h-full">
                <button onClick={(e)=>{handleedit(e,item.id)}} className="edit bg-violet-400 p-2 py-1 rounded-md text-white hover:bg-violet-600 mx-1 ">
                <MdEditNote />
                </button>
                <button onClick={(e) => { handledelete(e, item.id) }} className="delete bg-violet-400 p-2 py-1 rounded-md text-white hover:bg-violet-600 mx-1">
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
