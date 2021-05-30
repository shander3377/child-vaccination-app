import * as React from "react";

import {

    StyleSheet,

  

    View,
TouchableOpacity,
    Text
} from "react-native";
import { DrawerActions } from '@react-navigation/native';
import ChildVaccinesInfo from "./screens/ChildVaccinesInfo.js"
import InfantVaccinesInfo from "./screens/InfantVaccinesInfo.js"
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import WelcomeScreen from "./screens/welcomeScreen.js";
import SignUpScreen from "./screens/signUpScreen.js"
import HomeScreen from "./screens/homeScreen.js"
import LoginScreen from "./screens/loginScreen.js";
import VaccineShedule from "./screens/vaccineShedule.js"
import editVaccine from "./screens/editVaccine.js"
import ChildrenRegisterationScreen from "./screens/ChildrenRegisterScreen.js"
export default function App() {
    return (
      <AppContainer/>
    );
  }





const switchNavigator = createSwitchNavigator({
    WelcomeScreen:{screen: WelcomeScreen},
    LoginScreen:{screen: LoginScreen},
    SignUpScreen:{screen: SignUpScreen},
    HomeScreen: {screen: HomeScreen},
    ChildrenRegisterationScreen: {screen: ChildrenRegisterationScreen},
    InfantVaccinesInfo: {screen: InfantVaccinesInfo},
    ChildVaccinesInfo: {screen: ChildVaccinesInfo},
    VaccineShedule: {screen: VaccineShedule},
    editVaccine: {screen: editVaccine}
  })
  
  const AppContainer =  createAppContainer(switchNavigator);