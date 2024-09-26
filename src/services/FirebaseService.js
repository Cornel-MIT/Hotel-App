import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const registerAdmin = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out admin:", error);
    throw error;
  }
};

export const addAccommodation = async (accommodation) => {
  try {
    const docRef = await addDoc(collection(db, "accommodations"), accommodation);
    return docRef.id;
  } catch (error) {
    console.error("Error adding accommodation:", error);
    throw error;
  }
};

export const getAccommodations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "accommodations"));
    const accommodations = [];
    querySnapshot.forEach((doc) => {
      accommodations.push({ id: doc.id, ...doc.data() });
    });
    return accommodations;
  } catch (error) {
    console.error("Error getting accommodations:", error);
    throw error;
  }
};

export const updateAccommodation = async (id, updatedData) => {
  try {
    const accommodationRef = doc(db, "accommodations", id);
    await updateDoc(accommodationRef, updatedData);
  } catch (error) {
    console.error("Error updating accommodation:", error);
    throw error;
  }
};

export const deleteAccommodation = async (id) => {
  try {
    await deleteDoc(doc(db, "accommodations", id));
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    throw error;
  }
};

export const getAccommodationById = async (id) => {
  try {
    const docRef = doc(db, "accommodations", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such accommodation!");
      throw new Error("No such accommodation");
    }
  } catch (error) {
    console.error("Error getting accommodation by ID:", error);
    throw error;
  }
};
