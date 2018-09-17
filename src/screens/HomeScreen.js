import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AppStyles } from '../AppStyles';
import Hamburger from '../components/Hamburger';
import AsyncImageAnimated from '../components/AsyncImageAnimated';
import firebase from 'react-native-firebase';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Hamburger onPress={() => { navigation.openDrawer() }} />,
  });



  constructor(props) {
    super(props);

    this.categoriesRef = firebase.firestore().collection('categories');
    this.dealsRef = firebase.firestore().collection('categories');
    this.foodsRef = firebase.firestore().collection('foods');
    this.categorieUnsubscribe = null;
    this.dealsUnsubscribe = null;
    this.foodsUnsubscribe = null;


    this.state = {
      activeSlide: 0,
      categories: [], 
      deals: [], 
      foods: [],
      loading: false,
      error: null,
      refreshing: false
    };
  }

  onCategoriesCollectionUpdate = (querySnapshot) => {
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
      categories: data,
      loading: false,
    });
  }

  onDealsCollectionUpdate = (querySnapshot) => {
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
      deals: data,
      loading: false,
    });
  }

  onFoodsCollectionUpdate = (querySnapshot) => {
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
      foods: data,
      loading: false,
    });
  }

  componentDidMount() {
    this.categorieUnsubscribe = this.categoriesRef.onSnapshot(this.onCategoriesCollectionUpdate)
    this.dealsUnsubscribe = this.dealsRef.onSnapshot(this.onDealsCollectionUpdate)
    this.foodsUnsubscribe = this.foodsRef.onSnapshot(this.onFoodsCollectionUpdate)
  }

  componentWillUnmount() {
    this.categorieUnsubscribe();
    this.dealsUnsubscribe();
    this.foodsUnsubscribe();
  }




  onPressCategoryItem = (item) => {
    this.props.navigation.navigate('FoodList', { item: item });
  }

  onPressDealItem = (item) => {
    this.props.navigation.navigate('FoodList', { item: item });
  }

  onPressFoodItem = (item) => {
    this.props.navigation.navigate('FoodDetail', { item: item });
  }

  renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.categoryItemPhoto} source={{ uri: item.photo }} />
        <Text style={styles.categoryItemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  renderFoodItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressFoodItem(item)}>
      <View style={styles.foodItemContainer}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.foodPhoto} source={{ uri: item.photo }} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderDealItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onPressDealItem(item)}>
      <View style={styles.dealItemContainer}>
        <AsyncImageAnimated animationStyle={'fade'} placeholderColor={AppStyles.color.placeholder} style={styles.dealPhoto} source={{ uri: item.photo }} />
        <View style={styles.overlay} />
        <Text style={styles.dealName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  renderCategorySeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: "100%",
        }}
      />
    );
  };

  render() {
    const { activeSlide } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}> Popular Categories </Text>
        <View style={styles.categories}>
          <FlatList
            horizontal={true}
            initialNumToRender={4}
            // ItemSeparatorComponent={this.renderCategorySeparator}
            data={this.state.categories}
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderCategoryItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
        <Text style={styles.title}> Best Deals </Text>
        <View style={styles.deals}>
          <View style={styles.carousel}>
            <Carousel
              ref={(c) => { this._slider1Ref = c; }}
              data={this.state.deals}
              renderItem={this.renderDealItem}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              // hasParallaxImages={true}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              // loopClonesPerSide={2}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={this.state.deals.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor='white'
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
          </View>
        </View>
        <Text style={styles.title}> Most Popular </Text>
        <View style={styles.foods}>
          <FlatList
            initialNumToRender={2}
            data={this.state.foods}
            renderItem={this.renderFoodItem}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  categories: {
    height: 95,
    marginTop: 7,
  },
  categoryItemContainer: {
    margin: 5,
    alignItems: 'center'
  },
  categoryItemPhoto: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  categoryItemTitle: {
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.text,
  },
  deals: {
    marginTop: 10,
    minHeight: 200,
  },
  carousel: {

  },
  dealItemContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 200,
  },
  dealPhoto: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  dealName: {
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'center',
    color: 'white',
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    // backgroundColor: 'green',
    paddingVertical: 8,
    marginTop: 150,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },


  foods: {

  },
  foodItemContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
  },
  foodPhoto: {
    width: '100%',
    height: 200,
  },
  foodInfo: {
    marginTop: 10,
    flexDirection: 'row'
  },
  foodName: {
    flex: 1,
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'left',
    color: AppStyles.color.text,
  },
  foodPrice: {
    flex: 1,
    fontFamily: AppStyles.fontName.bold,
    textAlign: 'right',
    color: AppStyles.color.text,
  },
  title: {
    marginTop: 20,
    marginLeft: 5,
    fontFamily: AppStyles.fontName.bold,
    color: AppStyles.color.text,
    fontSize: 25,
  },
  photo: {
    height: 300,
  },
  detail: {
    height: 60,
    width: 100,
    marginRight: 10
  },

  description: {
    marginTop: 20,
    color: AppStyles.color.text,
  },
  buttonSetContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSet: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: AppStyles.borderRadius.main,
    borderColor: AppStyles.color.grey
  },
  count: {
    padding: 10,
    marginTop: 2,
    color: AppStyles.color.text,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: 'bold',
    textAlign: "center",
  },
  buttonContainer: {
    padding: 10,
    width: 50,
  },
  buttonText: {
    color: AppStyles.color.text
  },
  price: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: AppStyles.color.text,
    borderColor: AppStyles.color.grey,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 50,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor: AppStyles.color.main
  },
  actionButtonText: {
    color: AppStyles.color.white
  },



});