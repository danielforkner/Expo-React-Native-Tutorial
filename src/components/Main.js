import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegisterLogin from './auth/RegisterLogin';
import Logout from './auth/Logout';
import { auth, getUserByUid } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn, setStatus, setUser } from './auth/authSlice';
import MyProfile from './profile/MyProfile';

export default function Main() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUserId(user.uid);
        dispatch(setIsLoggedIn(true));
      }
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let user = await getUserByUid(userId);
      console.log(user);
      const { name, email, uid, docid } = user;
      dispatch(setUser({ uid, name, email, docid }));
    };

    if (userId && authStatus === 'idle') {
      getUser();
    }
  }, [authStatus, isLoggedIn]);

  return (
    <View style={styles.container}>
      {isLoggedIn && authStatus === 'idle' ? (
        <View>
          <Logout />
          {currentUser.email ? <MyProfile user={currentUser} /> : null}
        </View>
      ) : (
        <RegisterLogin />
      )}
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
