import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Welcome to Restaurant </Text>
        <Text> Check out our menus, order food and make rezervations </Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Signup"
          onPress={() => this.props.navigation.navigate('Signup')}
        />
      </View>
    );
  }
}