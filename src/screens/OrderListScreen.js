import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class OrderListScreen extends React.Component {
    static navigationOptions = {
        title: 'Orders',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Orders Screen </Text>  
            </View>
        );
    }
}