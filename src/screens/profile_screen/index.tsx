import React, {useEffect} from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native'
import {Text} from 'react-native'
import {View} from 'react-native'
import COLORS from '../../theme/color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {auth} from '../../utilities/firebase/firebase.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

const HEIGHT = Dimensions.get('window').height
const ProfilScreen = () => {
    const [user, setUser] = React.useState(null)
    const navigation = useNavigation()

    const getUser = async () => {
        const user: any = await AsyncStorage.getItem('user')
        setUser(JSON.parse(user))
    }

    useEffect(() => {
        (() => getUser())();
    }, [])


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialCommunityIcons name="arrow-left" size={30} color="white"/>
                    </TouchableOpacity>
                    <MaterialCommunityIcons
                        name="pencil"
                        size={30}
                        color="white"
                        onPress={() => navigation.navigate('Login')}
                        style={styles.logout}
                    />
                </View>
                <View style={styles.avatarContainer}>

                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {
                                user?.nom?.charAt(0) + user?.nom?.charAt(1)
                            }
                        </Text>
                    </View>
                    <View style={styles.avatarEmail}>
                        <Text style={styles.avatarEmailText}>
                            {
                                user?.email
                            }
                        </Text>
                    </View>


                </View>
                <View style={styles.body}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.themeColor,
                            padding: 20,
                            borderRadius: 10,
                            width: '85%',
                            borderRadius: 10,
                            marginBottom: 50,

                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        onPress={
                            () => {
                                auth.signOut()
                                AsyncStorage.removeItem('user')
                            }
                        }>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>
                            DECONNEXION
                        </Text>
                        <MaterialCommunityIcons name="logout" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.themeColor,

        height: HEIGHT * 0.30,
    },
    button: {
        marginLeft: 10,
    },
    logout: {
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 125,

    },
    avatar: {
        backgroundColor: COLORS.white,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: COLORS.themeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 40,
        color: COLORS.themeColor,
        textTransform: 'uppercase',
    },
    avatarName: {
        marginTop: 10,
    },
    avatarNameText: {
        fontSize: 20,
        color: '#000',
    },
    avatarEmail: {
        marginTop: 10,
    },
    avatarEmailText: {
        fontSize: 15,
        color: '#000',
    },

    body: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },


})


export default ProfilScreen
