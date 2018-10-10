import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RideList } from '../components/RideList';

export class Rides extends React.Component {
  static navigationOptions = {
    title: 'Rides'
  };
  render() {
    return (
      <RideList />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
