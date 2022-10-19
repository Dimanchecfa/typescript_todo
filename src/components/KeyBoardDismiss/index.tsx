import React from 'react';
import {View, StyleSheet} from 'react-native';
import { TouchableWithoutFeedback , Keyboard } from "react-native";

const DissmissKeyBoard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        { children }
    </TouchableWithoutFeedback>
)
const styles = StyleSheet.create({})

export default DissmissKeyBoard;
