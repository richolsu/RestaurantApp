import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Hamburger from '../components/Hamburger';


const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text> Home Screen </Text>
    <Image source={require('../../assets/icons/menu.png')} />
    <Button
      title="Go to Food"
      onPress={() => navigation.openDrawer()}
    />
    <Button
      title="Go to Categories"
      onPress={() => navigation.navigate('CategoryList')}
    />
    <Button
      title="Go to Search"
      onPress={() => navigation.navigate('Search')}
    />
    <Button
      title="Go to Cart2"
      onPress={() => navigation.dispatch({ type: 'Cart' })}
    />
    <Button
      title="Go to Reservation"
      onPress={() => navigation.navigate('Reservation')}
    />
    <Button
      title="Go to Order"
      onPress={() => navigation.navigate('OrderList')}
    />
    <Button
      title="Go to Welcome"
      onPress={() => navigation.navigate('Welcome')}
    />
  </View>
);

HomeScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: <Hamburger onPress={()=>{navigation.openDrawer()}}/>
});


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;