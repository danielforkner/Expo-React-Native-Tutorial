import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegisterLogin from './auth/RegisterLogin';
import Logout from './auth/Logout';
import { auth, getUserByUid } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn, setUser } from './auth/authSlice';

export default function Main() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        dispatch(setIsLoggedIn(true));
      }
    });

    const getUser = async () => {
      let user = await getUserByUid(userId);
      const { name, email, uid } = user;
      dispatch(setUser({ uid, name, email }));
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {isLoggedIn ? <Logout /> : <RegisterLogin />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
