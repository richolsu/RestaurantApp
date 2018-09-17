import React, { Component } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { FoodListItemStyle } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import firebase from 'react-native-firebase';

class SearchScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
      headerTitle:
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent', borderBottomColor: 'transparent',
            borderTopColor: 'transparent', flex: 1
          }}
          inputStyle={{ backgroundColor: 'rgba(0.9, 0.9, 0.9, 0.1)', borderRadius: 10, color: 'black' }}
          showLoading
          clearIcon={true}
          searchIcon={true}
          onChangeText={(text) => params.handleSearch(text)}
          // onClear={alert('onClear')}
          placeholder='Search' />,
    }
  };


  constructor(props) {
    super(props);


    this.state = {
      keyword: 'nadfaef',
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };

    this.ref = firebase.firestore().collection('foods');
    this.unsubscribe = null;
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

  onSearch = (text) => {
    if (text) {
      this.ref = firebase.firestore().collection('foods').where('name', '==', text);
    } else {
      this.ref = firebase.firestore().collection('foods');
    }

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.props.navigation.setParams({
      handleSearch: this.onSearch
    });
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
    this.props.navigation.navigate('FoodDetail', { item: item });
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
      <FlatList style={{ backgroundColor: 'white' }}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}


export default SearchScreen;
