import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import AddPatient from './Component/AddPatient';
import EditPatient from './Component/EditPatient'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/edit-patient/:id" element={<EditPatient />} />

        </Routes>
      </Router>
    </div>
  );
}
//

export default App;
