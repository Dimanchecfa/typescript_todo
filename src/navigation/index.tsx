//import liraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingScreen from '../screens/auth/Onboarding';
import Register from '../screens/auth/Register';
import Home from '../screens/home';
import ProfilScreen from '../screens/profile_screen';
import AddTodo from '../screens/todo/AddTodo';
import EditTodo from '../screens/todo/EditTodo';
import Login from '../screens/auth/Login';
import COLORS from '../utilities/constants/Color';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {RouteStackParamList} from "../type/RouteStackParamList";

const Stack = createNativeStackNavigator<RouteStackParamList>()
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {
                    // Auth
                    AuthStack.map((item, index) => {
                        return (
                            <Stack.Screen
                                key={index}
                                name={item.name}
                                component={item.component}
                                options={item.options}
                            />
                        )
                    })
                }
                {
                    // Home
                    AppStack.map((item, index) => {
                        return (
                            <Stack.Screen
                                key={index}
                                name={item.name}
                                component={item.component}
                                options={item.options}
                            />
                        )
                    })
                }
            </Stack.Navigator>
        </NavigationContainer>    );
};

export default Navigation ;

const AuthStack = [
    {
        name: 'Login',
        component: Login,
        options: StackNavigationOptions = {

        }
    },
    {
        name: 'Register',
        component: Register,
        options: {
            headerStyle: {
                backgroundColor: COLORS.themeColor,
                color : COLORS.white
            },
            headerTitleAlign: 'center',
            headerTintColor: COLORS.white,
            headerTitle :'Inscription'
        },
    },
    {
        name: 'Onboarding',
        component: OnboardingScreen,
        options: {
            headerShown: false,
        },
    },



]

const AppStack = [
    {
        name: 'Home',
        component: Home,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'Profile',
        component: ProfilScreen,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'EditTodo',
        component: EditTodo,
        options: {
            headerShown: false,
        },
    },
    {
        name: 'AddTodo',
        component: AddTodo,
        options: {
            headerShown: false,
        },
    },

]
    
