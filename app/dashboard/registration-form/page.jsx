/*
  app/dashboard/registration-form/page.jsx
*/

"use client";
import React, { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { useRouter } from 'next/navigation';

async function addDataToFireStore(firstName, lastName, id, email) {
  try {
    const docRef = await addDoc(collection(db, "user"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      id: id,
    }); 
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch {
    console.error("Error while adding document, error")
    return false;
  }
}

function RegistrationForm() {
  const router = useRouter();
  const { user } = UserAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user ? user.email: '');
  const [id, setId] = useState('');
  const [emailError, setEmailError] = useState('');
  const [idError, setIdError] = useState('');

  useEffect(() => {
    if (router.query && router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query]);
  

  const validateEmail = (email) => {
    if (!email.endsWith("@vsu.edu.ph")) {
      setEmailError('Invalid email. Email should end with "@vsu.edu.ph".');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateId = async (id) => {
    const doc = await db.collection('manuscriptCheckingStaff').doc(id).get();
    console.log("ID document data:", doc.data());
    if (!doc.exists) {
      console.log("No matching ID found in the database.");
      setIdError('Invalid ID. No matching ID found in the database.');
      return false;
    }
    setIdError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email) || !await validateId(id)) {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "user"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        id: id,
      }); 
      console.log("Document written with ID: ", docRef.id);
      setFirstName("");
      setLastName("");
      setEmail("");
      alert("Data added to firebase DB!")
    } catch (error) {
      console.error("Error while adding document:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-10'>
      <div className='mb-4'>
        <label htmlFor='firstName' className='block text-gray-700 font-bold mb-2'>
          First Name:
        </label>
        <input 
          type='text'
          id="firstName"
          className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} required
        />
        <label htmlFor='lastName' className='block text-gray-700 font-bold mb-2'>
          Last Name:
        </label>
        <input 
          type='text'
          id="lastName"
          className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)} required
        />
        <label htmlFor='id' className='block text-gray-700 font-bold mb-2'>
          ID:
        </label>
        <input 
          type='text'
          id="id"
          className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          value={id}
          onChange={(e) => setId(e.target.value)} required
        />
        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
          Email:
        </label>
        <input 
          type='text'
          id="email"
          className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          value={email}
          onChange={(e) => setEmail(e.target.value)} required
        />
        <input type="submit" value="Register" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      </div>
    </form>
  );
}

export default RegistrationForm;