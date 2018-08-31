import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class CartScreen extends React.Component {
    static navigationOptions = {
        title: 'Cart',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Cart Screen </Text>  
            </View>
        );
    }
}