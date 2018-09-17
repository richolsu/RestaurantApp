import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from '../components/MenuButton';

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton title='HOME' source={require('../../assets/icons/shop.png')} onPress={() => { navigation.navigate('Home') }} />
          <MenuButton title='MENU' source={require('../../assets/icons/menu.png')} onPress={() => { navigation.navigate('CategoryList') }} />
          <MenuButton title='SEARCH' source={require('../../assets/icons/search.png')} onPress={() => { navigation.navigate('Search') }} />
          <MenuButton title='CART' source={require('../../assets/icons/cart.png')} onPress={() => { navigation.navigate('Cart') }} />
          <MenuButton title='RESERVATIONS' source={require('../../assets/icons/reserve.png')} onPress={() => { navigation.navigate('Reservation') }} />
          <MenuButton title='ORDERS' source={require('../../assets/icons/delivery.png')} onPress={() => { navigation.navigate('OrderList') }} />
          <MenuButton title='LOG OUT' source={require('../../assets/icons/shutdown.png')} onPress={() => { navigation.dispatch({type: 'Logout'}) }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
})

