import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Search',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Search Screen </Text>  
            </View>
        );
    }
}