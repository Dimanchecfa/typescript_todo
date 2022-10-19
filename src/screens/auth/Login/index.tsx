import React, {useState} from 'react'
import {
    Alert,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Loader from '../../../components/Loader'
import {auth} from '../../../utilities/firebase/firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../../utilities/constants/Color'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RouteStackParamList} from '../../../type/RouteStackParamList'


const HEIGHT = Dimensions.get('window').height

type RouteProps = NativeStackScreenProps<RouteStackParamList, 'Login'>;

export const Login = ({navigation}: RouteProps) => {
    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [userData, setUserData] = useState<any>(null)
   const [inputs , setInputs] = useState<User>({
       email : '',
       password: ''
   })
    const [error, setError] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });
    const validate = async () => {

        let error = {}
        const { email , password} = inputs;
        if (!email || !password) {
            const error = {
                email: !email ? 'Email is required' : '',
                password: !password ? 'Password is required' : '',
            }
            return setError(error)
        } else {
            if (!email.includes('@') || !email.includes('.') || password.length < 6) {
                let error = {
                    email: !email.includes('@') || !email.includes('.') ? 'Email  invalide' : '',
                    password: 'Votre mot de passe doit contenir au moins 6 caractères'
                }
                return setError(error)
            }

        }
        const user = {
            email,
            password
        }
        setLoading(true);

        try {
            await auth.signInWithEmailAndPassword(user.email, user.password).then((userAuth) => {

                    setUserData({
                        email: userAuth.user?.email,
                        uid: userAuth.user?.uid,
                        nom: userAuth.user?.displayName,
                    })

                    AsyncStorage.setItem('user', JSON.stringify(userData));
                }
            )
            setLoading(false)


        } catch (error) {
            setLoading(false)

            setMessage("Email ou mot de passe incorrect")

        }
    }


        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor={COLORS.themeColor}/>
                <ScrollView>
                    <View style={styles.container}>


                        <View style={styles.header}>
                            <View style={{
                                justifyContent: 'center',
                                flex: -2,
                                marginBottom: 5,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'red',
                                }}>
                                    {message}
                                </Text>
                            </View>

                            <Input
                                onChangeText={() => setInputs({...inputs, email: inputs.email})}
                                onFocus={() => setError({...error, email: '', password: ''})}
                                iconName="email-outline"
                                label="Email"
                                value={inputs.email}
                                placeholder="Entrer votre adresse email"
                                error={error.email}
                            />
                            <Input
                                onChangeText={() => setInputs({...inputs, password: inputs.password})}
                                onFocus={() => setError({...error, password: '', email: ''})}
                                iconName="lock-outline"
                                label="Mot de passe"
                                placeholder="Entrer votre mot de passe"
                                error={error.password}
                                value={inputs.password}
                                password
                            />
                            <Button title="Se connecter" onPress={validate}/>
                            <Text>
                                Je n'ai pas de compte !{' '}
                                <Text
                                    onPress={() => navigation.navigate('Register')}
                                    style={{
                                        color: COLORS.themeColor,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: 16,
                                    }}
                                >
                                    S'inscrire
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <Loader visible={loading}/>
            </>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: HEIGHT,
            flexDirection: 'column',
            backgroundColor: COLORS.white,
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


