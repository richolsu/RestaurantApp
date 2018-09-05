import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { AppStyles, ButtonStyle, TextStyle, TextInputStyle } from '../AppStyles'
import Button from 'react-native-button';

class OrderListScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Orders',
    headerLeft:
      <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
        <Image source={require('../../assets/icons/home.png')} />
      </TouchableOpacity>
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  json = require('../jsons/orderlist.json');

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
    this.props.navigation.navigate('FoodDetail');
  }

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.list[0].photo }} />
      {
        item.list.map((food) => {
          return (
            <View style={styles.rowContainer} key={food.id}>
              <Text style={styles.count}>{food.count}</Text>
              <Text style={styles.title}>{food.name}</Text>
              <Text style={styles.price}>${food.price}</Text>
            </View>
          );
        })}
      <View style={styles.actionContainer}>
        <Text style={styles.total}>Total:${(item.list.reduce((prev, next) => prev + next.price * next.count, 0) + 1).toFixed(1)}</Text>
        <Button containerStyle={styles.actionButtonContainer} style={styles.actionButtonText}
          onPress={() => this.props.navigation.dispatch({ type: 'Cart' })}>REORDER</Button>
      </View>
    </View>
  );


  render() {
    return (
      <FlatList style={styles.flat}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => `${item.id}`}
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

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    backgroundColor: AppStyles.color.white
  },
  container: {
    marginBottom: 30,
    flex: 1,
    padding: 10,
  },
  photo: {
    height: 100,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  count: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    borderWidth: 1,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    color: AppStyles.color.main,
    borderColor: AppStyles.color.grey,
  },
  price: {
    padding: 10,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "center",
  },
  title: {
    flex: 1,
    padding: 10,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "left",
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  total: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    color: AppStyles.color.text,
    borderColor: AppStyles.color.grey,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    color: AppStyles.color.white
  }

});


export default OrderListScreen;
