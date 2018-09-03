import React from 'react';
import { StyleSheet, Image, Button, Text, View } from 'react-native';
import ShoppingCartButton from '../components/ShoppingCartButton'

const HomeScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> Home Screen </Text>  
        <Image source = {require('../../assets/icons/menu.png')} />
        <Button
            title="Go to Food"
            onPress={() => navigation.dispatch({ type: 'Cart' })}
        />
        <Button
            title="Go to Categories"
            onPress={() => this.props.navigation.navigate('CategoryList')}
        />
        <Button
            title="Go to Search"
            onPress={() => this.props.navigation.navigate('Search')}
        />
        <Button
            title="Go to Cart2"
            onPress={() => navigation.dispatch({ type: 'Cart' })}
        />
        <Button
            title="Go to Reservation"
            onPress={() => this.props.navigation.navigate('Reservation')}
        />
        <Button
            title="Go to Order"
            onPress={() => this.props.navigation.navigate('OrderList')}
        />
        <Button
            title="Go to Welcome"
            onPress={() => this.props.navigation.navigate('Welcome')}
        />
    </View>
);

HomeScreen.navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
        <Image
            source={require('../../assets/icons/home.png')}
            style={[styles.icon, {tintColor: tintColor}]}
        />
    ),
    headerLeft: <Image source = {require('../../assets/icons/home.png')} />
};


const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
});

export default HomeScreen;