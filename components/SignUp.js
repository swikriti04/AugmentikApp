import React, { Component } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { Picker} from "react-native";
import { Header } from './header';




export const SignUp = ({navigation}) => {

    const [name, setName] = React.useState('');
    const [alPhone, setALPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [states, setStates] = React.useState('');
    const [occupation, setOccupation] = React.useState('');

    console.log('sign')
        return (
            <View style={styles.container}>
            <Header headerName={'Sign Up'} navigation={navigation}/>
            <ScrollView
                style={{
                    marginTop: '30%',
                    marginRight: '4%',
                    marginBottom: '5%',
                    width: '95%',
                    borderRadius: 10,
                    borderBottomColor: '#e6e6e6',
                }}
            >
                <TextInput 
                    style={styles.input}
                    placeholder="Enter Name *"
                    onChangeText={(n) => setName(n)}
                />
                <View style={styles.inputpi}>
                    <Picker
                        style={styles.input}
                        onValueChange={ (value) => {
                            setOccupation(value)
                            //console.log(occupation)
                        }}
                        itemStyle={{backgroundColor: '#ffe4e1'}}
                        selectedValue = {occupation}

                    >
                        <Picker.Item label= 'Select Occupation *' value="disabled" color="#aaa" backgroundColor = '#ffe4e1' />
                        <Picker.Item label='Engineering & Technology' value='Engineering & Technology' />
                        <Picker.Item label='Health & Medicine' value='Health & Medicine' />
                        <Picker.Item label='Business' value='Business' />
                        <Picker.Item label='Financial Services & Accounts' value='Financial Services & Accounts' />
                        <Picker.Item label='Teaching' value='Teaching' />
                        <Picker.Item label='Security & Defence' value='Security & Defence' />
                        <Picker.Item label='Others' value='Others' />
                    </Picker>

                </View>
                <TextInput 
                    style={styles.input}
                    placeholder="Alternate Mobile Number"
                    onChangeText={(a) => setALPhone(a)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Email Address"
                    onChangeText={(e) => setEmail(e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="State of Residence"
                    onChangeText={(s) => setStates(s)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="City"
                    onChangeText={(c) => setCity(c)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="District"
                    onChangeText={(d) => setDistrict(d)}
                />
                <TouchableOpacity
                        onPress = {() => {
                            navigation.navigate('Verification')
                            
                        }}
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        marginLeft: '28%',
                        padding: 15,
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text 
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#FDA162',
                        }} 
                        
                    >
                        Submit
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
        )
}
