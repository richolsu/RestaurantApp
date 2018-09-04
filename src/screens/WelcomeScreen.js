import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Button from 'react-native-button';
import { ButtonStyle, TextStyle } from '../AppStyles'

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/icons/logo.png')} />
        <Text style={TextStyle.title}> Welcome to Restaurant </Text>
        <Text style={TextStyle.content}> Check out our menus, order food and make rezervations </Text>
        <Button containerStyle={ButtonStyle.loginContainer} style={ButtonStyle.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Log In
        </Button>
        <Button containerStyle={ButtonStyle.signupContainer} style={ButtonStyle.signupText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 150
  },
  logo: {
    width: 200,
    height: 200,
  }
})

