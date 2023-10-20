import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography } from '@mui/material';

function AddPatient() {
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [telecom, setTelecom] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const BASE_URL='http://localhost:5000';


  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      identifier,
      name: { given: givenName, family: familyName },
      telecom,
      gender,
      birthDate,
      address: { city, state, country }
    };
    try {
      await axios.post(`${BASE_URL}/api/patients`, patientData, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      alert('Patient added successfully!');
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Add Patient</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <TextField label="Identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} />
        <TextField label="Given Name" value={givenName} onChange={e => setGivenName(e.target.value)} />
        <TextField label="Family Name" value={familyName} onChange={e => setFamilyName(e.target.value)} />
        <TextField label="Telecom (Email/Phone)" value={telecom} onChange={e => setTelecom(e.target.value)} />
        <TextField label="Gender" value={gender} onChange={e => setGender(e.target.value)} />
        <TextField label="Birth Date" type="date" InputLabelProps={{ shrink: true }} value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <TextField label="City" value={city} onChange={e => setCity(e.target.value)} />
        <TextField label="State" value={state} onChange={e => setState(e.target.value)} />
        <TextField label="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Create Patient</Button>
      </form>
    </Container>
  );
}

export default AddPatient;
