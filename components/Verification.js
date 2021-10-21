import React, { Component } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button } from 'react-native'
import { Header } from './header';

export const Verification = ({navigation}) => {
    console.log('Veri')
        return (
            <View style={styles.container}>
            <Header headerName={'Verification'} navigation={navigation}/>
                <Text> Verification </Text>
                <Button title="Go to Inspection"
                    onPress = {() => navigation.navigate('Inspection')}
                />
            </View>
        )
}
