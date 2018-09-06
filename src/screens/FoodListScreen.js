import React, { Component } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { FoodListItemStyle } from '../AppStyles';


class FootListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: typeof (navigation.state.params) == 'undefined' || typeof (navigation.state.params.item) == 'undefined' ? 'Sandwiches' : navigation.state.params.item.name,
  });

  json = require('../jsons/foodlist.json');

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: this.json.results,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }



  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
          data: this.json.results,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
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
        // ItemSeparatorComponent={this.renderSeparator}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={50}
      />
    );
  }
}


export default FootListScreen;
