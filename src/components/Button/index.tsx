import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../../utilities/constants/Color';

interface Props {
  title: string;
  onPress: () => void;
}
const Button = ({title, onPress = () => {}} : Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.themeColor,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;