import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DrawerContainer from '../screens/DrawerContainer'
import DetailsScreen from '../screens/DetailsScreen';
import OrderListScreen from '../screens/OrderListScreen';
import ReservationScreen from '../screens/ReservationScreen';
import SearchScreen from '../screens/SearchScreen';
import FoodListScreen from '../screens/FoodListScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ShoppingCartButton from '../components/ShoppingCartButton';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const HomeNavigation = StackNavigator({
    Home: HomeScreen,
    Cart: CartScreen,
    OrderList: OrderListScreen,
    Reservation: ReservationScreen,
    Search: SearchScreen,
    FoodList: FoodListScreen,
    FoodDetail: FoodDetailScreen,
    CategoryList: CategoryListScreen,
    Details: DetailsScreen,
  }, {
    initialRouteName: 'Home',
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#4C3E54'},
      title: 'Welcome!',
      headerTintColor: 'white',
      headerRight: (
        <ShoppingCartButton />
    ),
    //   gesturesEnabled: false,
    //   headerLeft: drawerButton(navigation)
    })
  })
  
  const CartNavigation = StackNavigator({
    Cart: CartScreen,
    OrderList: OrderListScreen,
    Reservation: ReservationScreen,
    Search: SearchScreen,
    FoodList: FoodListScreen,
    FoodDetail: FoodDetailScreen,
    CategoryList: CategoryListScreen,
    Details: DetailsScreen,
  }, {
    headerMode: 'float',
    initialRouteName: 'Cart',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#4C3E54'},
      title: 'Welcome!',
      headerTintColor: 'white',
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation)
    })
  })

// drawer stack
const DrawerStack = DrawerNavigator({
    Home: HomeNavigation,
    Cart: CartNavigation,
}, {
    drawerPosition: 'left',
    initialRouteName: 'Cart',
    drawerWidth: 200,
    // gesturesEnabled: false,
    contentComponent: DrawerContainer
})


const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'white'}}
    onPress={() => {
        alert("you clicked me");
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.openDrawer()        
      } else {
        navigation.closeDrawer()
      }
    }
  }>Menu</Text>


const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
    // gesturesEnabled: false,
    // headerLeft: drawerButton(navigation)
  })
})


// login stack
const LoginStack = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: SignupScreen },
    Profile: { screen: WelcomeScreen }
}, {
        headerMode: 'float',
        navigationOptions: {
            headerStyle: { backgroundColor: '#E73536' },
            title: 'You are not logged in',
            headerTintColor: 'white'
        }
    })

// Manifest of possible screens
const RootNavigator = StackNavigator({
    loginStack: { screen: LoginStack },
    drawerStack: { screen: DrawerStack }
}, {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
    transitionConfig: noTransitionConfig
})



const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };

