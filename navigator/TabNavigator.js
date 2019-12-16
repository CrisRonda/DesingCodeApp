import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import { Ionicons } from "@expo/vector-icons";
const activeColor = "#4775f2";
const inactiveColor = "#b8bece";
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen
});
HomeStack.navigationOptions = ({ navigation }) => {
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  let tabBarVisible = routeName == "Section" ? false : true;
  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};
const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
});

const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen
});

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

ProjectsStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};
const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectsStack
});

export default TabNavigator;
