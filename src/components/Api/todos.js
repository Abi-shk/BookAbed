import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

// Custom hook to manage TODO tasks
export const useTodos = () => {

    const [todos, setTodos] = useState([]); // State to store the list of todos
    const [isLoading, setIsLoading] = useState(false); // State to manage loading status
    const { user } = useAuth(); // Get user information from Auth context

    // Function to fetch all todos for the current user
    const getAllTodos = async () => {
        try {
            setIsLoading(true); // Set loading state to true while fetching data
            const res = await axios.get(`https://bookabed-backend.onrender.com/api/todo/all/${user.userId}`);
            if (res.data.status) {
                setTodos(res.data.todos); // Update todos state with fetched data
            }
        } catch (err) {
            console.log(err);
            toast("Could not fetch tasks"); // Show error toast if fetching fails
        } finally {
            setIsLoading(false); // Set loading state to false after fetching
        }
    };

    // Function to save a new todo
    const saveTodos = async (todo) => {
        todo.userId = user.userId; // Assign userId to the todo object
        try {
            setIsLoading(true); // Set loading state to true while saving data
            const res = await axios.post("https://bookabed-backend.onrender.com/api/todo/save", todo);
            if (res.data.status) {
                setTodos(res.data.todos); // Update todos state with the new list of todos
                toast("Task saved"); // Show success toast
            }
        } catch (err) {
            console.log(err);
            toast("Could not save task"); // Show error toast if saving fails
        } finally {
            setIsLoading(false); // Set loading state to false after saving
        }
    };

    // Function to delete a todo
    const deleteTodo = async (todoId) => {
        try {
            setIsLoading(true); // Set loading state to true while deleting data
            const res = await axios.delete(`https://bookabed-backend.onrender.com/api/todo/delete/${todoId}`);
            if (res.data.status) {
                setTodos(res.data.todos); // Update todos state with the new list of todos
                toast("Task deleted"); // Show success toast
            }
        } catch (err) {
            console.log(err);
            toast("Could not delete task"); // Show error toast if deleting fails
        } finally {
            setIsLoading(false); // Set loading state to false after deleting
        }
    };

    // Function to mark a todo as completed
    const completedTodo = async (todoId) => {
        setIsLoading(true); // Set loading state to true while updating data
        try {
            const res = await axios.patch(`https://bookabed-backend.onrender.com/api/todo/completed/${todoId}`);
            if (res.data.status) {
                setTodos(res.data.todos); // Update todos state with the new list of todos
                if (res.data.completed) {
                    toast("Task completed"); // Show success toast if task is marked as completed
                }
            }
        } catch (err) {
            console.log(err);
            toast("Could not update task"); // Show error toast if updating fails
        } finally {
            setIsLoading(false); // Set loading state to false after updating
        }
    };

    // Fetch all todos when the component mounts
    useEffect(() => {
        getAllTodos();
    }, []);

    // Return the todos state and CRUD operations
    return { todos, isLoading, completedTodo, saveTodos, deleteTodo };
};
