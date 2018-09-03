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

