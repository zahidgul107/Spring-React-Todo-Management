import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ListTodo from './components/ListTodo'
import Header from './components/Header'
import Footer from './components/Footer'
import AddTodo from './components/AddTodo'
import Register from './components/Register'
import Login from './components/Login'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({ children }) {

    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    } else {
      return <Navigate to="/" />
    }
  }

  return (
    <>
      <BrowserRouter>
        < Header />
        <Routes>
          <Route path='/' element={< Login />} ></Route>
          <Route path='/todos' element={
            <AuthenticatedRoute>
              < ListTodo />
            </AuthenticatedRoute>
          }></Route>
          <Route path='/addTodo' element={
            <AuthenticatedRoute>
              < AddTodo />
            </AuthenticatedRoute>}></Route>
          <Route path='/updateTodo/:id' element={
            <AuthenticatedRoute>
              < AddTodo />
            </AuthenticatedRoute>}></Route>
          <Route path='/register' element={< Register />}></Route>
          <Route path='/login' element={< Login />}></Route>
        </Routes>
        < Footer />
      </BrowserRouter>
    </>
  )
}

export default App
