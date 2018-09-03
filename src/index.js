import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CartScreen from './screens/CartScreen';
import OrderListScreen from './screens/OrderListScreen';
import ReservationScreen from './screens/ReservationScreen';
import SearchScreen from './screens/SearchScreen';
import FoodListScreen from './screens/FoodListScreen';
import FoodDetailScreen from './screens/FoodDetailScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

import ShoppingCartButton from './components/ShoppingCartButton';

export default createDrawerNavigator({
    Home: {screen: HomeScreen,},
    Cart: {screen: CartScreen,},
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
                alignSelf:'center',
                flex: 1,
                fontFamily: 'MuseoSansRounded-300',
            },
            headerRight: (
                <ShoppingCartButton />
            ),
        },
    }
);