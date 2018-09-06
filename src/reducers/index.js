import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';
import { RootNavigator } from '../navigations/AppNavigation';


// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = RootNavigator.router.getActionForPathAndParams('drawerStack');
const initialNavState = RootNavigator.router.getStateForAction(
  firstAction
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    case 'Logout':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'drawerStack' }),
        state
      );
      break;
    case 'PlaceOrder':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'OrderList' }),
        state
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

function cart(state = [], action) {
  switch (action.type) {
    case 'Add':
      return [...state, action.item];
    case 'PlaceOrder':
      return [];
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
  cart,
});

export default AppReducer;
