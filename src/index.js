import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import ShoppingCartButton from './components/ShoppingCartButton';
import CartScreen from './screens/CartScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import DetailsScreen from './screens/DetailsScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';
import FoodListScreen from './screens/FoodListScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderListScreen from './screens/OrderListScreen';
import ReservationScreen from './screens/ReservationScreen';
import SearchScreen from './screens/SearchScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';


export default createDrawerNavigator({
  Home: { screen: HomeScreen, },
  Cart: { screen: CartScreen, },
}, {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerWidth: 200,
  });

const app = createStackNavigator(
  {
    Home: HomeScreen,
    Welcome: WelcomeScreen,
    Cart: CartScreen,
    OrderList: OrderListScreen,
    Reservation: ReservationScreen,
    Search: SearchScreen,
    FoodList: FoodListScreen,
    FoodDetail: FoodDetailScreen,
    CategoryList: CategoryListScreen,
    Details: DetailsScreen,
    Login: LoginScreen,
    SignUp: SignupScreen,
  },

  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        fontFamily: 'MuseoSansRounded-300',
      },
      headerRight: (
        <ShoppingCartButton />
      ),
    },
  }
);