import React from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import Icon from 'react-native-ionicons';
import COLORS from '../../utilities/constants/Color';



interface InputProps  {
    label?: string;
    error: string;
    value: string;
    password?: boolean;
    type?: KeyboardTypeOptions ;
    onChangeText: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    isMultiline?: boolean;
    numberOfLines?: number;
    placeholder?: string;
    iconName?: string;

  };




export const Input : React.FunctionComponent<InputProps> = ({
  label,
  error,
  value,
  password = false,
  type = 'default',
  onChangeText,
  onFocus,
  onBlur,
  isMultiline = false,
  numberOfLines = 1,
  placeholder = '',
  iconName = '',
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
   <>
     <View style={{marginBottom: 20}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? COLORS.red : isFocused ? COLORS.tint : COLORS.greyish,
            alignItems: isMultiline ? 'flex-start' : 'center',
            height: isMultiline ? 100 : 50,
            borderRadius : isMultiline ? 10 : 10,
            borderWidth : 1,
            
          },
        ]}>
        {
          !isMultiline && (
            <Icon
          name={iconName}
          style={{color: COLORS.black, fontSize: 22, marginRight: 10}}
        />
          )
        }
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(!isFocused)}
          secureTextEntry={hidePassword}
          multiline={isMultiline}
          numberOfLines={isMultiline ? 5 : 1}
          placeholder={placeholder}
          placeholderTextColor={COLORS.greyish}
          keyboardType={type}
          
          

         
          style={{color: COLORS.black, fontSize: 18 , width: '80%'}}

         
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.black, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
   </>
  );
};

const style = StyleSheet.create({
  label: {
   
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 0.5,
   
  },
});

export default Input;

