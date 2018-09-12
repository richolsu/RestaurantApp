import React, { Component } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { FoodListItemStyle } from '../AppStyles';
import firebase from 'react-native-firebase';

class FootListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: typeof (navigation.state.params) == 'undefined' || typeof (navigation.state.params.item) == 'undefined' ? 'Sandwiches' : navigation.state.params.item.name,
  });

  constructor(props) {
    super(props);

    const { navigation } = props;
    const item = navigation.getParam('item');


    this.ref = firebase.firestore().collection('foods').where('category', '==', item.id);
    this.unsubscribe = null;

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name, description, photo, price } = doc.data();
      data.push({
        id: doc.id,
        name,
        description,
        photo, 
        doc,
        price
      });
    });

    this.setState({ 
      data,
      loading: false,
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  onPress = (item) => {
    this.props.navigation.navigate('FoodDetail', {item: item});
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={FoodListItemStyle.title}
      subtitle={
        <View style={FoodListItemStyle.subtitleView}>
          <Text style={FoodListItemStyle.description}>{item.description}</Text>
          <Text style={FoodListItemStyle.price}>${item.price}</Text>
        </View>
      }
      onPress={() => this.onPress(item)}
      rightIcon={<Image style={FoodListItemStyle.rightIcon} source={{ uri: item.photo }} />}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );


  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
        initialNumToRender={5}
        refreshing={this.state.refreshing}
      />
    );
  }
}


export default FootListScreen;
