import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native'
import { RouteStackParamList } from '../../../type/RouteStackParamList';
import COLORS from '../../../utilities/constants/Color';


type RouteProps = NativeStackScreenProps<RouteStackParamList ,'Onboarding'>

const OnboardingScreen = ({navigation} : RouteProps) => {
    
    return (
      <>
      <StatusBar backgroundColor={COLORS.themeColor} barStyle="light-content" />
          <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      }}>
        <Text
          style={{
           
            fontWeight: 'bold',
            fontSize: 30,
            color: COLORS.themeColor,
          }}>
            BIENVENUE 
        </Text>
        <Text style={{
            fontSize: 20,
            width: 300,
            textAlign: 'center',
            marginTop: 10,
        }}>
           Cliquez sur le bouton commencer pour creer votre compte afin   d'enregistrer vos tâche et y accéder n'importe
            où.

        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image 
        source={require ('../../../../assets/list.png')}
        style={{width: 200, height: 200 , resizeMode:'contain' , transform : [{rotate : '10deg'}]}}
        />
        
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.themeColor,
          padding: 20,
          borderRadius: 10,
          width: '90%',
          // borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
            Commencer 
        </Text>
        <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
      </>
    )
}

export default OnboardingScreen
