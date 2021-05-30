// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     Alert,
//     ScrollView,
// } from "react-native";
// import { Asset } from "expo-asset";
// import { AppLoading } from "expo";
// import { LinearGradient } from "expo-linear-gradient";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import Feather from "react-native-vector-icons/Feather";
// import Entypo from "react-native-vector-icons/Entypo";
// import db from "../config.js";
// import firebase from "firebase";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import * as Animatable from "react-native-animatable";

// function cacheImages(images) {
//     return images.map((image) => {
//         if (typeof image === "string") {
//             return Image.prefetch(image);
//         } else {
//             return Asset.fromModule(image).downloadAsync();
//         }
//     });
// }
// export default class SignUpScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checkMailInput: false,
//             checkNameInput: false,
//             checkPhoneInput: false,
//             password: "",
//             password2: "",
//             email: "",
//             phone: "",
//             name: "",
//             secureTextEntry: true,
//             secureTextEntry2: true,
//             imageIsReady: false,
//             docId: "",
//         };
//     }
//   userSignUp = async (email, password, confirmPass) => {
//       if (password !== confirmPass) {
//           Alert.alert("Two Password fields don't match");
//       } else if (
//           this.state.checkMailInput == false ||
//       this.state.checkPhoneInput == false ||
//       this.state.checkNameInput == false
//       ) {
//           Alert.alert("Please fill all the details correctly");
//       } else {
//           firebase
//               .auth()
//               .createUserWithEmailAndPassword(email, password)
//               .then(() => {
//                   db.collection("user").add({
//                       first_name: this.state.name,

//                       mobile_no: this.state.phone,

//                       email_id: this.state.email,
//                   });

//                   Alert.alert("done");
//                   return this.props.navigation.navigate("HomeScreen");
//               })

//               .catch(function (error) {
//                   var errormsg = error.message;
//                   return console.warn(errormsg);
//               });
//       }
//   };

//   async _loadAssetsAsync() {
//       const imageAssets = cacheImages([require("../assets/bg.jpg")]);

//       await Promise.all([...imageAssets]);
//   }
//   mailInputChange(text) {
//       if (text.length !== 0) {
//           this.setState({
//               checkMailInput: true,
//               email: text,
//           });
//       } else {
//           this.setState({
//               checkMailInput: false,
//           });
//       }
//   }
//   nameInputChange(text) {
//       if (text.length !== 0) {
//           this.setState({
//               checkNameInput: true,
//               name: text,
//           });
//       } else {
//           this.setState({
//               checkNameInput: false,
//           });
//       }
//   }
//   phoneInputChange(text) {
//       if (text.length !== 0 && text.length == 10 && isNaN(text) == false) {
//           this.setState({
//               checkPhoneInput: true,
//               phone: text,
//           });
//       } else {
//           this.setState({
//               checkPhoneInput: false,
//           });
//       }
//   }

//   secureTextEntry() {
//       this.setState({
//           secureTextEntry: !this.state.secureTextEntry,
//       });
//   }
//   secureTextEntry2() {
//       this.setState({
//           secureTextEntry2: !this.state.secureTextEntry2,
//       });
//   }
//   render() {
//       if (!this.state.isReady) {
//           return (
//               <AppLoading
//                   startAsync={this._loadAssetsAsync}
//                   onFinish={() => this.setState({ isReady: true })}
//                   onError={console.warn}
//               />
//           );
//       }
//       return (
//           <View style={styles.container}>
//               <View style={StyleSheet.absoluteFill}>
//                   <Image
//                       source={require("../assets/bg.jpg")}
//                       style={{ flex: 1, height: null, width: null }}
//                   />
//               </View>
//               <View style={styles.header}></View>
//               <ScrollView>
//                   <Animatable.View animation="fadeInUpBig" style={styles.footer}>
//                       <TouchableOpacity
//                           onPress={() => {
//                               this.props.navigation.navigate("LoginScreen");
//                           }}
//                       >
//                           <AntDesign name="leftcircle" color="#56538c" size={30} />
//                       </TouchableOpacity>
//                       <Text style={styles.footerText}>E-MAIL</Text>
//                       <View style={styles.animation}>
//                           <FontAwesome5 name="user-circle" color="#56538c" size={20} />
//                           <TextInput
//                               placeholder="Your Email-ID"
//                               style={styles.textInput}
//                               onChangeText={(text) => this.mailInputChange(text)}
//                           />
//                           {this.state.checkMailInput ? (
//                               <Animatable.View animation="bounceIn">
//                                   <Feather name="check-circle" color="green" size={20} />
//                               </Animatable.View>
//                           ) : null}
//                       </View>

//                       <Text style={[styles.footerText, { marginTop: 35 }]}>Password</Text>
//                       <View style={styles.animation}>
//                           <FontAwesome5 name="lock" color="#56538c" size={20} />
//                           {this.state.secureTextEntry ? (
//                               <TextInput
//                                   secureTextEntry={true}
//                                   placeholder="Your Password"
//                                   style={styles.textInput}
//                                   value={this.state.password}
//                                   onChangeText={(text) => this.setState({ password: text })}
//                               />
//                           ) : (
//                               <TextInput
//                                   placeholder="Your Password"
//                                   style={styles.textInput}
//                                   value={this.state.password}
//                                   onChangeText={(text) => this.setState({ password: text })}
//                               />
//                           )}
//                           <TouchableOpacity onPress={() => this.secureTextEntry()}>
//                               {this.state.secureTextEntry ? (
//                                   <Feather name="eye-off" color="gray" size={20} />
//                               ) : (
//                                   <Feather name="eye" color="#8682ab" size={20} />
//                               )}
//                           </TouchableOpacity>
//                       </View>

//                       <Text style={[styles.footerText, { marginTop: 35 }]}>
//               Confirm Password
//                       </Text>
//                       <View style={styles.animation}>
//                           <FontAwesome5 name="lock" color="#56538c" size={20} />
//                           {this.state.secureTextEntry2 ? (
//                               <TextInput
//                                   secureTextEntry={true}
//                                   placeholder="Confirm Password"
//                                   style={styles.textInput}
//                                   value={this.state.password2}
//                                   onChangeText={(text) => this.setState({ password2: text })}
//                               />
//                           ) : (
//                               <TextInput
//                                   placeholder="Confirm Password"
//                                   style={styles.textInput}
//                                   value={this.state.password2}
//                                   onChangeText={(text) => this.setState({ password2: text })}
//                               />
//                           )}
//                           <TouchableOpacity onPress={() => this.secureTextEntry2()}>
//                               {this.state.secureTextEntry2 ? (
//                                   <Feather name="eye-off" color="gray" size={20} />
//                               ) : (
//                                   <Feather name="eye" color="#8682ab" size={20} />
//                               )}
//                           </TouchableOpacity>
//                       </View>
//                       <Text style={[styles.footerText, { marginTop: 35 }]}>Name</Text>
//                       <View style={styles.animation}>
//                           <FontAwesome5 name="user-circle" color="#56538c" size={20} />
//                           <TextInput
//                               placeholder="Your Name"
//                               style={styles.textInput}
//                               onChangeText={(text) => this.nameInputChange(text)}
//                           />
//                           {this.state.checkNameInput ? (
//                               <Animatable.View animation="bounceIn">
//                                   <Feather name="check-circle" color="green" size={20} />
//                               </Animatable.View>
//                           ) : null}
//                       </View>

//                       <Text style={[styles.footerText, { marginTop: 35 }]}>
//               Phone No.
//                       </Text>
//                       <View style={styles.animation}>
//                           <Entypo name="phone" color="#56538c" size={20} />
//                           <TextInput
//                               placeholder="Your Contact Number"
//                               style={styles.textInput}
//                               onChangeText={(text) => this.phoneInputChange(text)}
//                           />
//                           {this.state.checkPhoneInput ? (
//                               <Animatable.View animation="bounceIn">
//                                   <Feather name="check-circle" color="green" size={20} />
//                               </Animatable.View>
//                           ) : null}
//                       </View>
//                       <View style={styles.button}>
//                           <TouchableOpacity
//                               style={[
//                                   styles.signIn,
//                                   {
//                                       borderColor: "#4dc2f8",
//                                       borderWidth: 1,
//                                       marginTop: 15,
//                                   },
//                               ]}
//                               onPress={() =>
//                                   this.userSignUp(
//                                       this.state.email,
//                                       this.state.password,
//                                       this.state.password2
//                                   )
//                               }
//                           >
//                               <LinearGradient
//                                   colors={["#5db8fe", "#39cff2"]}
//                                   style={styles.signIn}
//                               >
//                                   <Text style={[styles.signinText, { color: "white" }]}>
//                     Sign Up
//                                   </Text>
//                               </LinearGradient>
//                           </TouchableOpacity>
//                       </View>
//                   </Animatable.View>
//               </ScrollView>
//           </View>
//       );
//   }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#b8b8b8",
//     },
//     header: {
//         flex: 1,
//         justifyContent: "flex-end",
//         paddingHorizontal: 25,
//         paddingBottom: 50,
//         paddingLeft: 10,
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: "black",
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 15,
//         paddingVertical: 20,
//     },
//     headerText: {
//         color: "#05375a",
//         fontSize: 18,
//     },
//     footerText: {
//         color: "#56538c",
//         fontSize: 18,
//     },
//     animation: {
//         flexDirection: "row",
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: "#f2f2f2",
//         paddingBottom: 5,
//     },
//     textInput: {
//         flex: 1,
//         paddingLeft: 10,
//         color: "#b8b8b8",
//     },
//     button: {
//         alignItems: "center",
//         marginTop: 50,
//     },
//     signIn: {
//         width: "100%",
//         height: 50,
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 10,
//     },
//     signinText: {
//         fontSize: 18,
//         fontWeight: "bold",
//     },
// });
