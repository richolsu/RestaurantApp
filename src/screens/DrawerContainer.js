import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class DrawerContainer extends React.Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    // const actionToDispatch = NavigationActions.reset({
    //   index: 0,
    //   key: null,  // black magic
    //   actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
    // })
    // this.props.navigation.dispatch(actionToDispatch)
    this.props.navigation.navigate('loginStack')
  }

  
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <Text
            onPress={() => navigation.navigate('Home')}
            style={styles.uglyDrawerItem}>
            HOME
        </Text>
          <Text
            onPress={() => navigation.navigate('Home')}
            style={styles.uglyDrawerItem}>
            MENU
        </Text>
          <Text
            onPress={() => navigation.navigate('Home')}
            style={styles.uglyDrawerItem}>
            SEARCH
        </Text>
          <Text
            onPress={() => navigation.navigate('Cart')}
            style={styles.uglyDrawerItem}>
            CART
        </Text>
          <Text
            onPress={() => navigation.navigate('Cart')}
            style={styles.uglyDrawerItem}>
            RESERVATIONS
        </Text>
          <Text
            onPress={() => navigation.navigate('Cart')}
            style={styles.uglyDrawerItem}>
            ORDERS
        </Text>
          <Text
            onPress={this.logout}
            style={styles.uglyDrawerItem}>
            Log Out
        </Text>
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
    paddingHorizontal: 20,
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})
