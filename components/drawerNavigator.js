import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AskQuestionsScreen from "../screens/askQuestionScreen.js";
import SearchScreen from "../screens/searchScreen.js";
import HomeScreen from "../screens/homeScreen"
import GiveAnswersScreen from "../screens/giveAnswersScreen"
import { Icon } from "react-native-elements";
export const DrawerNavigator = createDrawerNavigator({
    AskQuestionsScreen : {
    screen : AskQuestionsScreen,
    navigationOptions:{
      drawerIcon:<Icon name="question" type="fontisto"/>
    }
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions:{
        drawerIcon:<Icon name="search" type="ionicons"/>
      }
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions:{
        drawerIcon:<Icon name="home" type="ionicons"/>
      }
    },
    GiveAnswersScreen: {
      screen: GiveAnswersScreen,
      navigationOptions:{
        drawerIcon:<Icon name="gift" type="feather"/>
      }
    },
  },

  {
    initialRouteName : 'HomeScreen'
  })