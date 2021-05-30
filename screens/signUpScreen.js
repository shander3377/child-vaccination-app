import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Asset } from "expo-asset";
import db from '../config.js';
import firebase from "firebase";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Dropdown,
    GroupDropdown,
    MultiselectDropdown,
  } from 'sharingan-rn-modal-dropdown';
  import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
  import AntDesign from "react-native-vector-icons/AntDesign";
function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default SignUpScreen = ({navigation}) =>{
    const data = [
        {
          value: 'India',
          label: 'India',
          avatarSource: {
            uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1350px-Flag_of_India.svg.png',
          },
        },
        {
          value: 'Bangladesh',
          label: 'Bangladesh',
          avatarSource: {
            uri: 'https://cdn.countryflags.com/thumbs/bangladesh/flag-800.png',
          },
        },
        {
          value: 'Sri Lanka',
          label: 'Sri Lanka',
          avatarSource: {
            uri: 'https://www.countryflags.com/wp-content/uploads/sri-lanka-flag-png-large.png',
          },
        }
      ];
  const [phoneNumber, setPhoneNumber] = useState('')
const [checkPhone, setCheckPhone] = useState(false)

const [otp, setotp] = useState('')
const [mail, setMail] = useState('')
const [name, setName] = useState('')
const [checkName, setCheckName] = useState(false)
const [checkMail, setCheckMail] = useState(false)
const [checkOtp, setcheckOtp] = useState(false)
const [isReady, setisReady] = useState(false)
const [country, setCountry] = useState('')
const [checkCountry, setCheckCountry] = useState(false)
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
     if(checkOtp && checkPhone && checkMail && checkName){
      console.log("works")
        try{
     const credential = firebase.auth.PhoneAuthProvider.credential(
      verficationId,
         otp
     )
     console.warn(credential)

    await firebase.auth().signInWithCredential(credential).then(()=>{
        db.collection("user").add({
            name: name,

            mobile_no: phoneNumber,

            email_id: mail,
            country: country
        });

        Alert.alert("Sucesfully Created Your Account")
        navigation.navigate("HomeScreen")
    }) } catch (error){
   console.warn(error)
     Alert.alert(error.message)
 }
} else {
  Alert.alert("Please fill all the details")
}
}
 

   _loadAssetsAsync = async() =>{
      const imageAssets = cacheImages([require("../assets/bg.jpg")]);

      await Promise.all([...imageAssets]);
  }
  phoneInputChange = (text) =>{
      if (text.length !== 0) {
          setCheckPhone(true)
          setPhoneNumber("+91"+text)
        
      } else {
          setCheckPhone(false)
      }
  }
  nameInputChange = (text) =>{
    if (text.length !== 0) {
        setCheckName(true)
        setName(text)
      
    } else {
        setCheckName(false)
    }
}
mailInputChange = (text) =>{
    if (text.length !== 0) {
        setCheckMail(true)
        setMail(text)
      
    } else {
        setCheckMail(false)
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
countryInputChange = (text) =>{
    if (text.length !== 0) {
        setCheckCountry(true)
        setCountry(text)
      
    } else {
      setcheckCountry(false)
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
              <ScrollView>
              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <TouchableOpacity
                          onPress={() => {
                              this.props.navigation.navigate("LoginScreen");
                          }}
                      >
                          <AntDesign name="leftcircle" color="#5db8fe" size={30} style={{marginTop: -40}}/>
                      </TouchableOpacity>
                  <Text style={styles.footerText}> Mobile Number</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <TextInput
                          placeholder="Your Mobile Number"
                          style={styles.textInput}
                          onChangeText={(text) => phoneInputChange(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {checkPhone ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  <Text style={styles.footerText}> Name</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <TextInput
                          placeholder="Your Name"
                          style={styles.textInput}
                          onChangeText={(text) => nameInputChange(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {checkName ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  <Text style={styles.footerText}> Email-ID</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <TextInput
                          placeholder="Your Email-ID"
                          style={styles.textInput}
                          onChangeText={(text) => mailInputChange(text)}
                          placeholderTextColor="#5f8bad"
                      />
                      {checkMail ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                  <Text style={styles.footerText}> Country</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <Dropdown
            label={"Your Country"}
            data={data}
            value={country}
            onChange={(text)=>countryInputChange(text)}
            enableAvatar={true}
animationIn={"bounceInUp"}
animationOut={"bounceOutUp"}
textInputPlaceholderColor={"#5f8bad"}
          />
                      {checkCountry ? (
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
                              colors={["#5db8fe", "#39cff2"]}
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
                          placeholder="OTP SENT TO YOUR MOBILE NUMBER"
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
                  Sign Up
                              </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                   
                  </View>
           
              </Animatable.View>
              </ScrollView>
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
        paddingBottom: 175,
    },
    footer: {
        flex: 3,
        backgroundColor: "#ff5300",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 55,
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
        borderBottomColor: "#ff5300",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#5db8fe",
        borderBottomWidth: 1,
        borderBottomColor: "white"
    },
    button: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 15
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

