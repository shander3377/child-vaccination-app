import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Asset } from "expo-asset";
import {
    Dropdown,
    GroupDropdown,
    MultiselectDropdown,
  } from 'sharingan-rn-modal-dropdown';
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import db from "../config.js";
import firebase from "firebase";
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}
export default class ChildrenRegisterationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkMailInput: false,
            checkNameInput: false,
            checkPhoneInput: false,
            checkDOBInput: false,
            checkGenderInput: false,
            DOB: "",
            gender: "",
            name: "",
            shouldShow: false,
            data:[
                {
                  value: 'Male',
                  label: 'Male',
                  avatarSource: {
                    uri: 'https://w7.pngwing.com/pngs/786/826/png-transparent-public-toilet-gender-symbol-bathroom-male-man-toilet-text-bathroom-logo.png',
                  },
                },
                {
                  value: 'Female',
                  label: 'Female',
                  avatarSource: {
                    uri: 'https://w7.pngwing.com/pngs/140/265/png-transparent-female-gender-symbol-woman-symbol-logo-black-sign.png',
                  },
                },
               
                
              ]
        };
    }
  registerChild = async () => {

      if (this.state.checkDOBInput == false || this.state.checkGenderInput == false || this.state.checkNameInput == false) return Alert.alert("Please fill all the details")
var phone = firebase.auth().currentUser.phoneNumber
var dateofdob = new Date(this.state.DOB.nativeEvent.timestamp)

await db.collection("user").where("mobile_no", "==", phone).get().then((snapshot) => {
     snapshot.forEach(async(doc) => {
var array = ["Bacillus Calmette Guerin (BCG)", this.state.DOB.nativeEvent.timestamp+259200000, "-", "-"]
var array2 = ["Hepatitis B - Birth dose", this.state.DOB.nativeEvent.timestamp, "-", "-"]
var array3 = ["Oral Polio Vaccine (OPV)-0", this.state.DOB.nativeEvent.timestamp+604800000, "-", "-"]
var array4 = ["OPV 1, 2 & 3", "Till 5 Year Age", "-", "-"]
var array5 = ["Pentavalent 1, 2 & 3", "Till 1 Year Age", "-", "-"]
       await db.collection("user").doc(doc.id).collection("childrens").add({
           name: this.state.name,
           dob: dateofdob,
           gender: this.state.gender,
           "Bacillus Calmette Guerin (BCG)": array,
           "Hepatitis B - Birth dose": array2,
           "Oral Polio Vaccine (OPV)-0": array3, 
           "OPV 1, 2 & 3": array4,
           "Pentavalent 1, 2 & 3": array5
       })
  
    });
      

                  Alert.alert("done");
                  return this.props.navigation.navigate("VaccineShedule");
              })

              .catch(function (error) {
                  var errormsg = error.message;
                  return console.warn(errormsg);
              });
      
  };

  async _loadAssetsAsync() {
      const imageAssets = cacheImages([require("../assets/bg.jpg")]);

      await Promise.all([...imageAssets]);
  }

  nameInputChange(text) {
      if (text.length !== 0) {
          this.setState({
              checkNameInput: true,
              name: text,
          });
      } else {
          this.setState({
              checkNameInput: false,
          });
      }
  }
  checkDOB(text) {
    this.setState({
        shouldShow: false
    })

    if (text.type === "set") {
        this.setState({
            checkDOBInput: true,
            DOB: text,
        });
    } else {
        this.setState({
            checkDOBInput: false,
        });
    }
}
should(){
    this.setState({shouldShow: true})
    console.warn(this.state.shouldShow)
}
  genderInputChange(text) {
      if (text.length !== 0) {
          this.setState({
              checkGenderInput: true,
              gender: text,
          });
      } else {
          this.setState({
            checkGenderInput: false,
          });
      }
  }
  render() {
      if (!this.state.isReady) {
          return (
              <AppLoading
                  startAsync={this._loadAssetsAsync}
                  onFinish={() => this.setState({ isReady: true })}
                  onError={console.warn}
              />
          );
      }
      return (
          <View style={styles.container}>
              <View style={StyleSheet.absoluteFill}>
                  <Image
                      source={require("../assets/bg.jpg")}
                      style={{ flex: 1, height: null, width: null }}
                  />
              </View>
              <View style={styles.header}></View>
              <ScrollView>
                  <Animatable.View animation="bounceInRight" style={styles.footer}>
                    
                      <Text style={styles.footerText}>ChildName</Text>
                      <View style={styles.animation}>
                          <MaterialCommunityIcons name="rename-box" color="#5db8fe" size={20} />
                          <TextInput
                              placeholder="Name of the Child"
                              style={styles.textInput}
                              onChangeText={(text) => this.nameInputChange(text)}
                          />
                          {this.state.checkNameInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                      </View>
                      {this.state.shouldShow ? (
        <DateTimePicker
          mode={"date"}
          display="calendar"
          onChange={(date)=>this.checkDOB(date)}
          value={new Date()}
        />
      ):null}
                      <Text style={styles.footerText}>DOB of the Child</Text>
                      <View style={styles.animation}>
                          
                          <MaterialIcons name="date-range" color="#5db8fe" size={55} />
                          <TouchableOpacity
                              style={{
                                width: "50%",
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                      color: 'green',
                                      borderColor: "#4dc2f8",
                                      borderWidth: 1,
                               marginLeft: 50
                              }}
                              onPress={() =>
                                this.should()
                               
                              }
                          >
                           
                              <Text style={ {
                                  marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold",
        color: "#4dc2f8" }}>Select DOB</Text>
                          </TouchableOpacity>
                          
                          {this.state.checkDOBInput ? (
                              <Animatable.View animation="bounceIn">
                                  <Feather name="check-circle" color="green" size={20} />
                              </Animatable.View>
                          ) : null}
                     </View>
                     <Text style={styles.footerText}> Gender of the child</Text>
                  <View style={styles.animation}>
                      <FontAwesome5 name="user-circle" color="#5db8fe" size={20} />
                      <Dropdown
            label={"Select Gender"}
            data={this.state.data}
            value={this.state.gender}
            onChange={(text)=>this.genderInputChange(text)}
            enableAvatar={true}
animationIn={"bounceInUp"}
animationOut={"bounceOutUp"}
          />
                      {this.state.checkGenderInput ? (
                          <Animatable.View animation="bounceIn">
                              <Feather name="check-circle" color="green" size={20} />
                          </Animatable.View>
                      ) : null}
                  </View>
                   
                      <View style={styles.button}>
                          <TouchableOpacity
                              style={[
                                  styles.signIn,
                                  {
                                      borderColor: "#4dc2f8",
                                      borderWidth: 1,
                                      marginTop: 15,
                                  },
                              ]}
                              onPress={() =>
                                  this.registerChild()
                              }
                          >
                              <LinearGradient
                                  colors={["#5db8fe", "#39cff2"]}
                                  style={styles.signIn}
                              >
                                  <Text style={[styles.signinText, { color: "white" }]}>
                   Register Child
                                  </Text>
                              </LinearGradient>
                          </TouchableOpacity>
                      </View>
                      <Text style={[styles.footerText, {fontSize: 10, color:"#3c7099"}]}>Note: Multiple Child functionality In Progress</Text>
                  </Animatable.View>
              </ScrollView>
          </View>
      );
  }
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
        paddingBottom: 300,
        paddingLeft: 10,
    },
    footer: {
        flex: 3,
        backgroundColor: "#ff5300",
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    dobb:{
        width: "50%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    headerText: {
        color: "#05375a",
        fontSize: 18,
    },
    footerText: {
        color: "#5db8fe",
        fontSize: 18,
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
        color: "#b8b8b8",
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
        borderRadius: 10,
    },
    signinText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
