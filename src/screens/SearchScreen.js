import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import Hamburger from '../components/Hamburger';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerLeft: <Hamburger onPress={()=>{navigation.openDrawer()}}/>
  });


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Search Screen </Text>
      </View>
    );
  }
}