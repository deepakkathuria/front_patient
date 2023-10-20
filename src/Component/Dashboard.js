import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const BASE_URL = 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/patients`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
        setPatients(res.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/patients/${id}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      const updatedPatients = patients.filter(patient => patient._id !== id);
      setPatients(updatedPatients);
    } catch (err) {
      console.error('Error deleting patient:', err);
    }
  };

  return (
    <Container>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
        <Grid item>
          <Typography variant="h4">LIST OF PATIENTS</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate('/add-patient')}>Add Patient</Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {patients.map(patient => (
          <Grid item xs={12} sm={6} md={4} key={patient._id}>
            <Card>
              <CardContent>
                <Button
                  startIcon={<EditIcon />}
                  size="small"
                  onClick={() => navigate(`/edit-patient/${patient._id}`)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  size="small"
                  color="error"
                  onClick={() => deletePatient(patient._id)}
                >
                  Delete
                </Button>
                <Typography variant="h6">{patient.name.given} {patient.name.family}</Typography>
                <Typography variant="subtitle1">Identifier: {patient.identifier}</Typography>
                <Typography color="textSecondary">Email/Phone: {patient.telecom}</Typography>
                <Typography color="textSecondary">Gender: {patient.gender}</Typography>
                <Typography color="textSecondary">BirthDate: {new Date(patient.birthDate).toLocaleDateString()}</Typography>
                <Typography color="textSecondary">Address: {patient.address.city}, {patient.address.state}, {patient.address.country}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
