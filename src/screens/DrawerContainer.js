import React from 'react'
import { TouchableHighlight, StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import MenuButton from '../components/MenuButton'

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton title='HOME' source={require('../../assets/icons/home.png')} onPress={()=>{navigation.navigate('Home')}} />
          <MenuButton title='MENU' source={require('../../assets/icons/menu.png')} onPress={()=>{navigation.navigate('CategoryList')}} />
          <MenuButton title='SEARCH' source={require('../../assets/icons/search.png')} onPress={()=>{navigation.navigate('Search')}} />
          <MenuButton title='CART' source={require('../../assets/icons/cart.png')} onPress={()=>{navigation.navigate('Cart')}} />
          <MenuButton title='RESERVATIONS' source={require('../../assets/icons/reserve.png')} onPress={()=>{navigation.navigate('Reservation')}} />
          <MenuButton title='ORDERS' source={require('../../assets/icons/delivery.png')} onPress={()=>{navigation.navigate('OrderList')}} />
          <MenuButton title='LOG OUT' source={require('../../assets/icons/shop.png')} onPress={()=>{navigation.navigate('loginStack')}} />
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
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  btnContainer: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'flex-start',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },

  btnText: {
    fontFamily: 'FallingSkyCond',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
  }
})

