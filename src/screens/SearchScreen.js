import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
        <Image source={require('../../assets/icons/home.png')} />
      </TouchableOpacity>
  });


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Search Screen </Text>
      </View>
    );
  }
}