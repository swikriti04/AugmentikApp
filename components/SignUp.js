import React, { useState } from 'react'
import {styles} from '../assets/style'
import { Text, View, Button, ScrollView, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Picker} from "react-native";
import { Header } from './header';




export const SignUp = ({navigation, route}) => {

    const { phoneNo } = route.params;
    const [phoneNmbr, setPhoneNo] = useState(phoneNo);
    const [name, setName] = React.useState('');
    const [alPhone, setALPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [states, setStates] = React.useState('');

    const handleSubmit = () => {

        if(name.length===0 || email.length === 0 || city.length===0 || district.length ===0 || states.length===0 ){
            Alert.alert("* Fields are required","Fill all the Required Fields")
        }
        else{

            var formdata = new FormData();
                formdata.append("PartnerId", Math.floor(Math.random() * 1000000) + 1000);
                formdata.append("PhoneNo", phoneNmbr);
                formdata.append("name", name);
                formdata.append("alternatePhone", alPhone);
                formdata.append("email", email);
                formdata.append("City", city);
                formdata.append("District", district);
                formdata.append("State", states);
        
                console.log(formdata);
                
                var requestOptions = {
                  method: 'POST',
                  body: formdata,
                  redirect: 'follow'
                };
                
                fetch("https://sheet.best/api/sheets/4c94b24a-cb78-4f28-83ac-db543d230840", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
    
                navigation.navigate('Verification')
        }
    }


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
                <TextInput 
                    style={styles.input}
                    placeholder="Alternate Mobile Number"
                    onChangeText={(a) => setALPhone(a)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Email Address *"
                    onChangeText={(e) => setEmail(e)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="State of Residence *"
                    onChangeText={(s) => setStates(s)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="City *"
                    onChangeText={(c) => setCity(c)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="District *"
                    onChangeText={(d) => setDistrict(d)}
                />
                <TouchableOpacity
                        onPress = {() => {
                            //handleSubmit()
                            navigation.navigate('Site')
                            
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
