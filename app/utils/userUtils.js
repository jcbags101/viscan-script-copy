/*
    app/utils/firebaseUtils.js
*/

import { db } from './firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export const printUserEntries = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        console.log('Document data:', doc.data());
      });
    } catch (error) {
      console.error('Error printing user entries:', error);
    }
  };

export const checkIfUserExists = async (email) => {
  try {
    printUserEntries();
    const usersCollection = collection(db, 'users');
    const usersQuery = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(usersQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

