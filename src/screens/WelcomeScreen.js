import React from 'react';
import { Button, Text, View } from 'react-native';
import HeaderSearch from '../components/HeaderSearch';

export default class WelcomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text> Welcome Screen </Text>  
                <Button
                    title="Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="Signup"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}