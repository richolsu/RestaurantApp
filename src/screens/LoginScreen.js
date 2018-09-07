import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles, ButtonStyle, TextInputStyle, TextStyle } from '../AppStyles';

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={[TextStyle.title, TextStyle.leftTitle]}>Sign In</Text>
    <View style={TextInputStyle.container}>
      <TextInput style={TextInputStyle.body} placeholder="E-mail or phone number" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
    </View>
    <View style={TextInputStyle.container}>
      <TextInput style={TextInputStyle.body} secureTextEntry={true} placeholder="Password" placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
    </View>
    <Button containerStyle={ButtonStyle.loginContainer} style={ButtonStyle.loginText}
      onPress={() => navigation.dispatch({ type: 'Login' })}>Log in</Button>
    <Text style={styles.or}>OR</Text>
    <Button containerStyle={ButtonStyle.facebookContainer} style={ButtonStyle.facebookText}
      onPress={() => navigation.dispatch({ type: 'Login' })}>Facebook Login</Button>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10
  }
});

export default LoginScreen;
