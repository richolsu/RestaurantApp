import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Hamburger from '../components/Hamburger';

export default class ReservationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Reservation',
    headerLeft: <Hamburger onPress={()=>{navigation.openDrawer()}}/>
  });


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Reservation Screen </Text>
      </View>
    );
  }
}