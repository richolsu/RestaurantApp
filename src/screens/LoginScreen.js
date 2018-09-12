import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import { AppStyles, ButtonStyle, TextInputStyle, TextStyle } from '../AppStyles';
import firebase from 'react-native-firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: 'jhon@gmail.com',
      password: '111111',
    };
  }

  onPressLogin = () => {

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const {navigation} = this.props;
        firebase.firestore().collection('users').doc(user.uid).get().then(function (doc) {
          if (doc.exists) {
            navigation.dispatch({ type: 'Login', user: {id:doc.id, ...doc.data()} });
          } else {
            navigation.dispatch({ type: 'Login', user: {id:user.uid, fullname:'', phone:'', email:user.email} });
          }
        }).catch(function (error) {
          const { code, message } = error;
          alert(message);
        });
      })
      .catch((error) => {
        const { code, message } = error;
        alert(message);
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }

  onPressFacebook = () => {
    alert("no action");
    // this.props.navigation.dispatch({ type: 'Login', user: {} });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[TextStyle.title, TextStyle.leftTitle]}>Sign In</Text>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} placeholder="E-mail or phone number" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <View style={TextInputStyle.container}>
          <TextInput style={TextInputStyle.body} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} value={this.state.password} placeholderTextColor={AppStyles.color.grey} underlineColorAndroid='transparent' />
        </View>
        <Button containerStyle={ButtonStyle.loginContainer} style={ButtonStyle.loginText}
          onPress={() => this.onPressLogin()}>Log in</Button>
        <Text style={styles.or}>OR</Text>
        <Button containerStyle={ButtonStyle.facebookContainer} style={ButtonStyle.facebookText}
          onPress={() => this.onPressFacebook()}>Facebook Login</Button>
      </View>
    );

  }
}



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
