import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListTodo from './components/ListTodo'
import Header from './components/Header'
import Footer from './components/Footer'
import AddTodo from './components/AddTodo'

function App() {

  return (
    <>
    <BrowserRouter>
      < Header />


      
      <Routes>
        <Route path='/' element= {< ListTodo />} ></Route>
        <Route path='/todos' element={< ListTodo />}></Route>
        <Route path='/addTodo' element={< AddTodo />}></Route>
        <Route path='/updateTodo/:id' element={< AddTodo />}></Route>
      </Routes>
      < Footer />
    </BrowserRouter>
    </>
  )
}

export default App
