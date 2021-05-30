import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Asset } from "expo-asset";
import db from '../config.js';
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import firebase from "firebase";
import { useNavigation } from '@react-navigation/native';

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default LoginScreen = ({navigation}) =>{
  const [phoneNumber, setPhoneNumber] = useState('')
const [checkPhone, setCheckPhone] = useState(false)
const [otp, setotp] = useState('')
const [checkOtp, setcheckOtp] = useState(false)
const [isReady, setisReady] = useState(false)
const [verficationId, setverficationId] = useState(null)
const reacaptchaVerifier = useRef(null)
  sendOtp = async() =>{
 
      try{
          const phonePorvider = new firebase.auth.PhoneAuthProvider();
          const verificationId = await phonePorvider.verifyPhoneNumber(
              phoneNumber, reacaptchaVerifier.current
          );
        setverficationId(verificationId);
Alert.alert("Your otp has been sent to your sms. Please check it and fill it below")
      } catch(err){
          Alert.alert(`Error:  ${err}`)
          console.warn(err)
      }
  }
 confirmOtp = async() =>{
 console.log(otp)
     if(checkOtp){
      console.log("works")
        try{
     const credential = firebase.auth.PhoneAuthProvider.credential(
      verficationId,
         otp
     )
     console.warn(credential)

     const response = await firebase.auth().signInWithCredential(credential)
     console.log(response)
     if(response){
       Alert.alert("Succesfully Logged In")
       navigation.navigate("HomeScreen")
        //  this.props.navigation.navigate("HomeScreen")
     }
 } catch (error){
   console.warn(error)
     Alert.alert(error.message)
 }
} else {
  Alert.alert("Please enter the opt first")
}
}
 

   _loadAssetsAsync = async() =>{
      const imageAssets = cacheImages([require("../assets/bg.jpg")]);

      await Promise.all([...imageAssets]);
  }
  textInputChange = (text) =>{
      if (text.length !== 0) {
          setCheckPhone(true)
          setPhoneNumber("+91"+text)
        
      } else {
          setCheckPhone(false)
      }
  }

  otpInputChange = (text) =>{
    if (text.length !== 0) {
      setcheckOtp(true)
        setotp(text)
      
    } else {
      setcheckOtp(false)
    }
}
      if (!isReady) {
          return (
              <AppLoading
                  startAsync={_loadAssetsAsync}
                  onFinish={() => setisReady(true)}
                  onError={console.warn}
              />
          );
      }

      return (
          <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
        ref={reacaptchaVerifier}
        firebaseConfig={db._delegate.app.options}
        attemptInvisibleVerification={false}
        />
              <View style={StyleSheet.absoluteFill}>
                  <Image
                      source={require("../assets/bg.jpg")}
                      style={{ flex: 1, height: null, width: null }}
                  />
              </View>
              <View style={styles.header}></View>
            
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                  <Text style={styles.footerText}> Mobile Number</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <TextInput
                          placeholder="Your Mobile Number"
                          style={styles.textInput}
                          onChangeText={(text) => textInputChange(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {checkPhone ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  <View style={styles.button}>
                      <TouchableOpacity
                          onPress={()=>{sendOtp()}}
                          style={styles.signIn}
                      >
                          <LinearGradient
                              colors={["#5db8fe", "#0fc9f5"]}
                              style={styles.signIn}
                          >
                              <Text style={[styles.signinText, { color: "white" }]}>
                SEND OTP
                              </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      </View>
                  <Text style={styles.footerText}>OTP</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <TextInput
                          placeholder="Otp recieved through sms"
                          style={styles.textInput}
                          onChangeText={(text) => otpInputChange(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {checkOtp ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  <View style={styles.button}>
                      <TouchableOpacity
                          onPress={()=>{confirmOtp()}}
                          style={styles.signIn}
                      >
                          <LinearGradient
                              colors={["#5db8fe", "#39cff2"]}
                              style={styles.signIn}
                          >
                              <Text style={[styles.signinText, { color: "white" }]}>
                  Sign In
                              </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() =>   navigation.navigate("SignUpScreen")}
                          style={[
                              styles.signIn,
                              {
                                  borderColor: "#4dc2f8",
                                  borderWidth: 1,
                                  marginTop: 15,
                                  borderRadius: 77,
                              },
                          ]}
                      >
                          <Text
                              style={[
                                  styles.signinText,
                                  {
                                      color: "#4dc2f8",
                                  },
                              ]}
                          >
                Sign Up
                          </Text>
                      </TouchableOpacity>
                  </View>
              </Animatable.View>
          </View>
      );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b8b8b8",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "#ff5300",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    headerText: {
        color: "#05375a",
        fontSize: 18,
    },
    footerText: {
        color: "#5db8fe",
        fontSize: 18,
        fontWeight: "bold"
    },
    animation: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#5db8fe",
    },
    button: {
        alignItems: "center",
        marginTop: 50,
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    signinText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

