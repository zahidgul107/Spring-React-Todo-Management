import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { createTodo, getTodo, updateTodo } from '../services/TodoService'

const AddTodo = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState('')

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        completed: ''
    })

    const { id } = useParams();

    const navigator = useNavigate();

   useEffect(() => {

    if (id) {
        getTodo(id).then((response) => {
            console.log(response.data)
            setTitle(response.data.title);
            setDescription(response.data.description);
            setCompleted(response.data.completed);
        }).catch(error =>{
            console.error(error);
        })
    }
   }, [id])

    function saveOrUpdateTodo(e) {
        e.preventDefault();
        if (validateForm()) {
            const todo = { title, description, completed }
            console.log(todo)
            if (id) {  
                updateTodo(id, todo).then((response) =>{
                    console.log(response.data);
                    navigator("/todos");
                }).catch(error =>{
                    console.error(error);
                })
            } else {
                createTodo(todo).then((response) => {
                    console.log(response.data);
                    navigator("/todos")
                }).catch(error =>{
                    console.error(error);
                })
            }         
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Title is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        if (completed) {
            errorsCopy.completed = '';
        } else {
            errorsCopy.completed = 'Task complete status is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Todo</h2>
        } else {
            return <h2 className='text-center'>Add Todo</h2>
        }
    }
  return (
    <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} />
                                {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input type="text" className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="exampleInputPassword1" value={description} onChange={(e) => setDescription(e.target.value)} />
                                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Completed</label>
                                <select type="email" className={`form-control ${errors.completed ? 'is-invalid' : ''}`} id="exampleInputPassword1" value={completed} onChange={(e) => setCompleted(e.target.value)} >
                                    <option value="">Select task status</option>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                                {errors.completed && <div className='invalid-feedback'>{errors.completed}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={saveOrUpdateTodo}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddTodo