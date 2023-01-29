import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuthValue } from '../auth/context';
import Searchbar from '../components/Searchbar';
import Screen from '../components/Screen';


function Friends(props) {
  const [token, setToken] = useState('');
  const { currentUser } = useAuthValue();

  

  return <Screen>
      <Searchbar placeholder='Search for Friend'/>

  </Screen>;
}

const styles = StyleSheet.create({
  container: {},
});

export default Friends;
