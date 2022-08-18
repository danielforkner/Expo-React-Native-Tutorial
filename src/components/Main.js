import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import RegisterLogin from './auth/RegisterLogin';
import Logout from './auth/Logout';
import { auth, getUserByUid } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setIsLoggedIn, setUser } from './auth/authSlice';
import MyProfile from './profile/MyProfile';

export default function Main() {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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

    if (userId) {
      getUser();
    }
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Logout />
          <MyProfile user={currentUser} />
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
