import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../../context/AuthContext"


export const useTodos = () => {

    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()


    const getAllTodos = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`https://bookabed-backend.onrender.com/api/todo/all/${user.userId}`)
            if (res.data.status) {
                setTodos(res.data.todos)
            }
        } catch (err) {
            console.log(err)
            toast("could not fetch tasks")
        } finally {
            setIsLoading(false)
        }
    }


    const saveTodos = async (todo) => {
        todo.userId = user.userId
        try {
            setIsLoading(true)
            const res = await axios.post("https://bookabed-backend.onrender.com/api/todo/save", todo)
            if (res.data.status) {
                setTodos(res.data.todos)
                toast("Task saved")
            }
        } catch (err) {
            console.log(err)
            toast("could not save Task")
        } finally {
            setIsLoading(false)
        }
    }


    const deleteTodo = async (todoId) => {
        try {
            setIsLoading(true)
            const res = await axios.delete(`https://bookabed-backend.onrender.com/api/todo/delete/${todoId}`)
            if (res.data.status) {
                setTodos(res.data.todos)
                toast("Task Deleted")
            }
        } catch (err) {
            console.log(err)
            toast("could not delete Task")
        } finally {
            setIsLoading(false)
        }
    }


    const completedTodo = async (todoId) => {
        setIsLoading(true)
        try {
            const res = await axios.patch(`https://bookabed-backend.onrender.com/api/todo/completed/${todoId}`)
            if (res.data.status) {
                setTodos(res.data.todos)
                if (res.data.completed) {
                    toast("Task Completed")
                }
            }
        } catch (err) {
            console.log(err)
            toast("could not update Task")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllTodos()
    }, [])

    return { todos, isLoading, completedTodo, saveTodos, deleteTodo }

}