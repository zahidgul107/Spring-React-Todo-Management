import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService';


const ListTodo = () => {

const [todos, setTodos] =useState([]);

const navigator = useNavigate();

useEffect(() =>{
    listTodos();
}, [])

function listTodos() {
    getAllTodos().then((response) => {
        setTodos(response.data);
    }).catch(error =>{
        console.error(error);
    })  
}

function updateTodo(id) {
    navigator(`/updateTodo/${id}`);
}

function removeTodo(id) { 
    deleteTodo(id).then((response) => {
        listTodos();
        console.log(response.data)
    }).catch(error =>{
        console.error(error);
    })
}

function markCompleteTodo(id) {
    completeTodo(id).then((response) =>{
        console.log(response.data);
        listTodos();
    }).catch(error =>{
        console.error(error);
    })
}

function markInCompleteTodo(id) {
    inCompleteTodo(id).then(response =>{
        listTodos();
    }).catch(error =>{
        console.error(error);
    })
}

  return (
    <div className='container'>
            <h2 className='text-center'>List of Todos</h2>
            <Link to='/addTodo' className="btn btn-secondary mb-2">Add Todo</Link>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">Todo Title</th>
                        <th scope="col">Todo Description</th>
                        <th scope="col">Todo Completed</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button className='btn btn-info me-2' onClick={() =>updateTodo(todo.id)}>Update</button>
                                <button className='btn btn-danger me-2' onClick={() => removeTodo(todo.id)}>Delete</button>
                                <button className='btn btn-success me-2' onClick={() => markCompleteTodo(todo.id)}>Complete</button>
                                <button className='btn btn-warning' onClick={() => markInCompleteTodo(todo.id)}>InComplete</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
  )
}

export default ListTodo