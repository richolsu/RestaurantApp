import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',        
        headerTitle: <HeaderSearch />,
    };
    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Login Screen </Text>  
            </View>
        );
    }
}