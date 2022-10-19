import { Text } from '@react-native-material/core'
import React from 'react'
import { Image } from 'react-native'
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import { auth } from '../../../utilities/firebase/firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../../utilities/constants/Color'

const HEIGHT = Dimensions.get('window').height

  type Props = {
    navigation: any;
    error : string;
    loading : boolean;
    text : string;
    input : string;
    prevState : string;
  };



const Register = ({ navigation } : Props) : JSX.Element => {
  const [inputs, setInputs] = React.useState<{ nom: string; email: string; password: string }>({
    email: '',
    password: '',
    nom: '',
  });

  const [loading, setloading] = React.useState(false)

  const [errors, setErrors] = React.useState<{ nom: string; email: string; password: string }>({
    nom: '',
    email: '',
    password: '',
  })
  const [userData , setUserData] = React.useState<any>(null)

  
  const validate = async () => {
    const { nom, email, password } = inputs

    let error = {}
    if (!nom || !email || !password) {
      let error = {
        nom: !nom ? 'Votre nom est requis' : '',
        email: !email ? 'Votre email est requis' : '',
        password: !password ? 'Votre mot de passe est requis' : '',
      }
      return setErrors(error)
    } else {
      if (!email.includes('@') || !email.includes('.') || password.length < 6) {
        let error = {
          email: !email.includes('@') || !email.includes('.') ? 'Votre email est invalide' : '',
          password: password.length < 6 ? 'Votre mot de passe doit contenir au moins 6 caractères' : '',
          nom: '',
        }
        return setErrors(error)
      }
    }

    const user = {
      nom,
      email,
      password,
    }
    setloading(true)

    try {
    await  auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then( (userAuth : any) => {
         userAuth.user.updateProfile({
            displayName: user.nom,
          })
          setUserData({
            nom: userAuth.user.displayName,
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
          AsyncStorage.setItem('user', JSON.stringify(userData))
         
        })
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }




  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Input
              
              iconName="account-outline"
              label="Nom complet"
              placeholder="Enter votre nom complet"
              error={errors.nom}
              value={inputs.nom}
              onFocus={() => setErrors({ ...errors, nom: '' })}
              onChangeText={() => setInputs({ ...inputs, nom: '' })}

              

            />
            <Input
              onChangeText={() => setInputs({ ...inputs, email: '' })}
              onFocus={() => setErrors({ ...errors, email: '' })}
              iconName="email-outline"
              label="Email"
              placeholder="Entrer votre adresse email"
              error={errors.email}
              value={inputs.email}
            />
            <Input
              onChangeText={() => setInputs({ ...inputs, password: '' })}
              onFocus={() => setErrors({ ...errors, password: '' })}
              iconName="lock-outline"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              error={errors.password}
              password
              value={inputs.password}
            />
            <Button title="S'inscrire" onPress={validate} />
            <Text>
              J'ai deja un compte!{' '}
              <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                  color: COLORS.themeColor,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                }}
              >
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
        <Loader visible={loading} />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    height: HEIGHT,
    width: '100%',
  },
  header: {
    marginTop: 80,
    width: '100%',
    paddingHorizontal: 30,
  },
  area: {
    backgroundColor: '#ffffff',
    height: HEIGHT / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  area_text: {
    fontSize: 25,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
})

export default Register
