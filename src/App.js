import React from 'react';
import './App.css';
import NavBar from './Components/NavCompo/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import AddContact from './Components/Contacts/AddContact/AddContact'
import Spinner from './Components/Spinner/Spinner';

function App() {
  return (
    <div className="App">
      
      <NavBar/>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Navigate to={'contacts/list'}/>}/>
          <Route path='/contacts/list' element={<ContactList/>}/>
          <Route path='/contacts/edit/:contactID' element={<EditContact/>}/>
          <Route path='/contacts/view/:contactId' element={<ViewContact/>}/>
          <Route path='/contacts/add' element={<AddContact/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
