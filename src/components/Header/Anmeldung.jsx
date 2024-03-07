import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const Message = styled.div`
  margin-top: 10px;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

function Anmeldung() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    street: '',
    city: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    const url = `http://localhost:3000/users/${isLogin ? 'login' : 'register'}`;

    try {
      const response = await axios.post(url, formData);
      setSuccessMessage(`Erfolgreich ${isLogin ? 'angemeldet' : 'registriert'}. Willkommen!`);
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <Container>
      <Title>{isLogin ? 'Anmeldung' : 'Registrierung'}</Title>
      {errorMessage && <Message>{errorMessage}</Message>}
      {successMessage && <Message success>{successMessage}</Message>}
      <Form onSubmit={handleSubmit}>
        {!isLogin && <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />}
        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-Mail" required />
        <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Passwort" required />
        {!isLogin && (
          <>
            <Input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Straße" />
            <Input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ort" />
          </>
        )}
        <Button type="submit">{isLogin ? 'Anmelden' : 'Registrieren'}</Button>
      </Form>
      <Button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Zur Registrierung' : 'Zur Anmeldung'}
      </Button>
    </Container>
  );
}

export default Anmeldung;
