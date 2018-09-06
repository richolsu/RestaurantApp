import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';

export default class Hamburger extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image style={styles.headerButtonImage} source={require('../../assets/icons/home.png')} />
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButtonImage: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    margin: 6
  }
});  