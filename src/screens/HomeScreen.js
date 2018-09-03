import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  drawerLabel: 'Home',
  drawerIcon: () => (
    <Image
      source={require('../../assets/icons/home.png')}
      style={styles.icon}
    />
  ),
  headerLeft: 
    <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
      <Image source={require('../../assets/icons/home.png')} />
    </TouchableOpacity>
  
});


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;