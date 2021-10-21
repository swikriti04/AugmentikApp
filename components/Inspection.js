import React, { Component } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button } from 'react-native'
import { Header } from './header';

export const Inspection = ({navigation}) => {
    console.log('Insp')
        return (
            <View style={styles.container}>
            <Header headerName={'Inspection'} navigation={navigation}/>
                <Text> Inspection </Text>
                <Button title="Go to pro selection"
                    onPress = {() => navigation.navigate('ProSelect')}
                />
            </View>
        )
}
