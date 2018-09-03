import React from 'react';
import { Animated, Easing, Text } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import ShoppingCartButton from '../components/ShoppingCartButton';
import CartScreen from '../screens/CartScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerContainer from '../screens/DrawerContainer';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import FoodListScreen from '../screens/FoodListScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderListScreen from '../screens/OrderListScreen';
import ReservationScreen from '../screens/ReservationScreen';
import SearchScreen from '../screens/SearchScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

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

const drawerButton = (navigation) =>
  <Text
    style={{padding: 5, color: 'white'}}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  }>Menu</Text>

const MainNavigation = StackNavigator({
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
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        fontFamily: 'FallingSkyCond',
      },
      
      headerRight: (
        <ShoppingCartButton />
      ),
    })
  })

// drawer stack
const DrawerStack = DrawerNavigator({
  Main: MainNavigation
}, {
  drawerPosition: 'left',
  initialRouteName: 'Main',
  drawerWidth: 350,
  contentComponent: DrawerContainer
})


// login stack
const LoginStack = StackNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  Welcome: { screen: WelcomeScreen }
}, {
  initialRouteName: 'Welcome',
  headerMode: 'float',
  cardStyle: { backgroundColor: '#FFFFFF' },
})


// Manifest of possible screens
const RootNavigator = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})



const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };

