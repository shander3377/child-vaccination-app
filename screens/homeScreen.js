/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { SearchBar, Header } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "agrim",
            search: '',
        };
    }
    updateSearch = (search) => {
        this.setState({ search });
    };
    render() {
        const { search } = this.state;

        return (
            
            <View style={styles.container}>

<Header
ViewComponent={LinearGradient}
  leftComponent={{ icon: 'menu', color: '#fff', size: 35, paddingTop: 15 }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff', fontSize: 20, paddingTop: 15} }}
  rightComponent={{ icon: 'home', color: '#fff', size: 35, paddingTop: 15 }}
  linearGradientProps={{
    colors:['#8431bc', '#BE414D', '#EC670F'],
    start:{ x: -1, y: 0 },
    end:{ x: 1, y: 0 }
  }}
  containerStyle={{height: 100}}
/>           
<LinearGradient
        colors={['#8431bc', '#BE414D', '#EC670F']}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
            borderRadius: 30,
            marginTop: 70,
            width: 300,
            height: 140,
            marginLeft: 45
        }}
        >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChildrenRegisterationScreen")}>
                        <Image
                            source={{uri: "https://i.pinimg.com/474x/ac/e4/b6/ace4b612df7d61fd5b52c30450d38aa3.jpg"}}
                            style={{
                                width: 80,
                                height: 70,
                                borderRadius: 10,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                        ></Image>
                        <Text style={{ color: "white", fontSize: 20,  textAlign: 'center' }}>
            Register Your Child
                        </Text>
                        <Text style={{  color: "black", fontSize: 10,  textAlign: 'center' }}>
        Add Child to database
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                 
               

   
                     <LinearGradient
        colors={['#8431bc', '#BE414D', '#EC670F']}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
            borderRadius: 30,
            marginTop: 10,
            width: 300,
            height: 140,
            marginLeft: 45
        }}
        >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("ChildVaccinesInfo")}>
                        <Image
                            source={{uri: "https://previews.123rf.com/images/vasyll/vasyll1904/vasyll190400033/122008531-information-icon-information-medium-gray-background-vector-illustration.jpg"}}
                            style={{
                                width: 80,
                                height: 70,
                                borderRadius: 10,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                        ></Image>
                        <Text style={{  color: "white", fontSize: 20, textAlign: 'center' }}>
                        Children Vaccines Info
                        </Text>
                        <Text style={{ color: "black", fontSize: 10, textAlign: 'center'}}>
           Get information about vaccines of childrens
                        </Text>
                    </TouchableOpacity>
                    </LinearGradient>
              
           
               
                    <LinearGradient
        colors={['#8431bc', '#BE414D', '#EC670F']}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
            borderRadius: 30,
            marginTop: 10,
            width: 300,
            height: 140,
            marginLeft: 45
        }}
        >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("InfantVaccinesInfo")}>
                        <Image
                            source={{uri:"https://previews.123rf.com/images/vasyll/vasyll1904/vasyll190400033/122008531-information-icon-information-medium-gray-background-vector-illustration.jpg"}}
                            style={{
                                width: 80,
                                height: 70,
                                borderRadius: 10,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                        ></Image>
                        <Text style={{ color: "white", fontSize: 20, textAlign: 'center' }}>
           Infant's Vaccine Info
                        </Text>
                        <Text style={{ marginLeft: 15, color: "black", fontSize: 10, textAlign: 'center'}}>
                        Get Information About vaccines of infants
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

          
                <LinearGradient
        colors={['#8431bc', '#BE414D', '#EC670F']}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
            borderRadius: 30,
            marginTop: 10,
            width: 300,
            height: 140,
            marginLeft: 45
        }}
        >
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("VaccineShedule")}>
                        <Image
                            source={{uri:"https://cdn5.vectorstock.com/i/1000x1000/14/34/time-schedule-icon-vector-21001434.jpg"}}
                            style={{
                                width: 80,
                                height: 70,
                                borderRadius: 10,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                        ></Image>
                        <Text style={{ color: "white", fontSize: 20, textAlign: 'center' }}>
         Shedule vaccines
                        </Text>
                        <Text style={{ marginLeft: 15, color: "black", fontSize: 10, textAlign: 'center'}}>
          Shedule Vaccine time and doctor
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    headerText: {
        color: "#05350a",
        fontSize: 18,
    },
    footerText: {
        color: "#05350a",
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
    },
    signinText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
