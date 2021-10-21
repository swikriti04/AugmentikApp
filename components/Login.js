import React, {useState, useRef} from 'react'
import {styles} from '../assets/style'
import { Button, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units';
import { Header } from './header';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../firebase';

export const Login = ({navigation}) => {

    const [phoneNo, setPhoneNo] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [code, setCode] = useState('');
    const [show, setShow] = useState('No-show');

    const sendVerification = () => {
        navigation.navigate('signUp', {phoneNo: phoneNo});
        // if(phoneNo.length === 13){
        //     const phoneProvider = new firebase.auth.PhoneAuthProvider();
        //     //console.log(recaptchaVerifier)
        //     phoneProvider
        //     .verifyPhoneNumber(phoneNo, recaptchaVerifier.current)
        //     .then((verificationId) => {
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
        console.log(typeof(code));
        console.log(verificationId);
        if(code.length===0){
            Alert.alert('Invalid Code','Please enter the code', [{text: 'OK'}])
        }
        else if(code.length<6){
            Alert.alert('Invalid Code', 'Code must be 6 digits long', [{text: 'OK'}])
        }
        else if(code.length>6){
            Alert.alert('Invalid Code', 'Code must be 6 digits long', [{text: 'OK'}])
        }else{
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              code
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then((result) => {
                // Do something with the results here
                console.log("success");
                console.log(result);
                navigation.navigate('signUp', {phoneNo});
                //navigation.navigate('Details', {phoneNo});
              }).then((err) => {
                  
                //Alert.alert("Invalid Code", err)
                //setShow('No-Show')
                console.log(err)});
            // let res = await firebase
            //     .auth()
            //     .signInWithCredential(credential)
            //     console.log(res)
        }
      }

        return (
            <View style={styles.container}>
            <Header headerName={'Login'} navigation={navigation}/>
            
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
                            width: vw(100),
                        }}
                    >
                        <Text style = {{
                            borderBottomColor: '#FDA162',
                            borderBottomWidth: 3,
                            marginBottom: 15,
                            paddingBottom: 10,
                            fontSize: 18,
                        }}>
                            Login
                        </Text>
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextInput 
                                style = {{
                                    marginTop: 20,
                                    justifyContent:'center',
                                    alignContent: 'center',
                                    padding: 80,
                                    marginLeft: 80
                                }}
                                placeholder="Phone Number"
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
                                padding: 20,
                                margin: 7,
                                width: '105%',
                                backgroundColor: `#FDA162`,
                                borderRadius: 70
                        }}
                            onPress={() =>{
                            console.log(phoneNo);
                            sendVerification();
                        }}
                        >
                            <Text style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 50,
                                color: '#fff',
                                fontWeight: 'bold'
                            }}>Send OTP To My Phone</Text>
                            
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
