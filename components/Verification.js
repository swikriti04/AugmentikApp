import React, {useState, useRef, useEffect} from 'react'
import {styles} from '../assets/style'
import { Button, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units';
import { Header } from './header';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../firebase';
import axios from 'axios';

export const Verification = ({navigation}) => {

    const [phoneNo, setPhoneNo] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [code, setCode] = useState('');
    const [show, setShow] = useState('No-show');
    const [some, setSome] = useState(false);

    var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/4c94b24a-cb78-4f28-83ac-db543d230840',
        headers: { }
    };

    const sendVerification = () => {
        navigation.navigate('Inspection', {phoneNo: phoneNo});
        // if(phoneNo.length === 13){
        //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
        //     //console.log(recaptchaVerifier)
        //     phoneProvider
        //     .verifyPhoneNumber(phoneNo, recaptchaVerifier.current)
        //     .then((verificationId) => {
        //         Alert.alert('OTP Sent', 'OTP Sent to Your Phone')
        //         console.log('Verification sent');
        //         //console.log(setVerificationId);
        //         setShow('show otp')
        //         setVerificationId(verificationId);
        //         // let id = verificationId;
        //         // return id
        //     })
        // }else{
        //     Alert.alert('Invalid Phone Number', 'Please enter a valid phone number', [{text: 'OK'}])
        // }
    };

    const confirmCode = async () => {
        console.log("verification id: ",verificationId);
        if(code.length===0){
            Alert.alert('Invalid Code','Please enter the code', [{text: 'OK'}])
        }
        else if(code.length<6 || code.length>6){
            Alert.alert('Invalid Code', 'Code must be 6 digits long', [{text: 'OK'}])
        }else{
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              code
            );
            console.log("otp: ", code);
            const firebaseAuth = firebase
              .auth()
              .signInWithCredential(credential);
            firebaseAuth.then((result) => {
                //console.log("result: ", result);
                some && setSome(false)
                navigation.navigate('Inspection', {phoneNo});
            }).catch((error) => {
                console.log("error: ", error.Error);
                Alert.alert('Invalid Code', 'Please enter the correct code', [{text: 'OK'}])
            })
        }
      }

      useEffect(() => {
          setSome(true);
      }, [some])

        return (
            <View style={styles.container}>
            <Header headerName={'Verification'} navigation={navigation}/>
            
                {
                    show === 'No-show' ?
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            margin: 10,
                            padding: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: vw(95),
                        }}
                    >
                        <Text style = {{
                            borderBottomColor: '#FDA162',
                            borderBottomWidth: 3,
                            marginBottom: 15,
                            paddingBottom: 10,
                            fontSize: 18,
                        }}>
                            Customer's Verification
                        </Text>
                        <View
                            style={{
                                width: '95%',
                                marginTop: 5,
                                padding: 10,
                                borderWidth: 2,
                                borderRadius: 8,
                                borderColor: `#FDA162`,
                            }}
                        >
                            <TextInput 
                                style = {{
                                    //marginTop: 20,
                                    //borderWidth: 2,
                                    //borderColor: `#FDA162`,
                                    //justifyContent:'center',
                                    //alignContent: 'center',
                                    //padding: 80,
                                    //marginLeft: 80
                                }}
                                placeholder="Customer's Phone Number"
                                defaultCode="IN"
                                style={styles.inputss}
                                keyboardType="phone-pad" 
                                onChangeText={(text) => {
                                    let ind = '+91';
                                    let nmbr = ind + text;
                                    setPhoneNo(nmbr)
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                padding: 15,
                                margin: 7,
                                width: '80%',
                                backgroundColor: `#FDA162`,
                                borderRadius: 70
                        }}
                            onPress={async () =>{
                            console.log(phoneNo);
                            phoneNo.length === 13 ? sendVerification() : Alert.alert('Invalid Phone Number', 'Please enter a valid phone number', [{text: 'OK'}])
                        }}
                        >
                            <Text style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 25,
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>Verify Phone Number</Text>
                            
                        </TouchableOpacity>
                        <FirebaseRecaptchaVerifierModal
                            ref={recaptchaVerifier}
                            firebaseConfig={firebase.app().options}
                        />
                    </View>
                    :
                    <View
                        style={{
                            margin: 0,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: vw(100),
                        }}
                    >
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            placeholder="Enter OTP"
                            onChangeText={setCode}
                        />
                        
                        <Button title="verify otp"
                            onPress={() => {
                                setShow('No-show');
                                confirmCode();
                            }}
                        />
                    </View>
                }
            </View>
        )
}
