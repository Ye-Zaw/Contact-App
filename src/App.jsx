import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Contacts from './compoents/Contacts'
import Create from './compoents/Create'
import Edit from './compoents/Edit'

const App = () => {
  return (
    <div className='container mx-auto'>
      <Routes>
        <Route path='/' element={<Contacts />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </div>
  )
}

export default App