import { FETCH_ADMIN_NAME } from './types';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const fetchAdminName = () => async (dispatch) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'admins', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const adminData = userDoc.data();
        dispatch({ type: FETCH_ADMIN_NAME, payload: adminData.name });
      } else {
        console.error('No such admin!');
      }
    } else {
      console.error('No user is logged in');
    }
  } catch (error) {
    console.error('Error fetching admin details:', error.message);
  }
};
