// src/components/EditPatient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Edit as EditIcon } from '@mui/icons-material';


function EditPatient() {
  const [identifier, setIdentifier] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [telecom, setTelecom] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const { id } = useParams();
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/patients/${id}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
        const patient = res.data;
        setIdentifier(patient.identifier);
        setGivenName(patient.name.given);
        setFamilyName(patient.name.family);
        setTelecom(patient.telecom);
        setGender(patient.gender);
        setBirthDate(patient.birthDate.substring(0, 10)); // Extract only YYYY-MM-DD part
        setCity(patient.address.city);
        setState(patient.address.state);
        setCountry(patient.address.country);
      } catch (err) {
        console.error('Error fetching patient:', err);
      }
    };

    fetchPatient();
  }, [id, BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      identifier: identifier,
      name: {
        given: givenName,
        family: familyName
      },
      telecom: telecom,
      gender: gender,
      birthDate: birthDate,
      address: {
        city: city,
        state: state,
        country: country
      }
    };
    try {
      await axios.put(`${BASE_URL}/api/patients/${id}`, patientData, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      alert('Patient updated successfully!');
    } catch (err) {
      console.error('Error updating patient:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Edit Patient</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField label="Identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} />
        <TextField label="Given Name" value={givenName} onChange={e => setGivenName(e.target.value)} />
        <TextField label="Family Name" value={familyName} onChange={e => setFamilyName(e.target.value)} />
        <TextField label="Telecom (Email/Phone)" value={telecom} onChange={e => setTelecom(e.target.value)} />
        <TextField label="Gender" value={gender} onChange={e => setGender(e.target.value)} />
        <TextField type="date" label="Birth Date" value={birthDate} onChange={e => setBirthDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField label="City" value={city} onChange={e => setCity(e.target.value)} />
        <TextField label="State" value={state} onChange={e => setState(e.target.value)} />
        <TextField label="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Update Patient</Button>
      </form>
    </Container>
  );
}

export default EditPatient;
