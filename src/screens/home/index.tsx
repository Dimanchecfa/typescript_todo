import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import React, { useState } from 'react'
import {
  Dimensions,
  Text,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import DissmissKeyBoard from '../../components/KeyBoardDismiss'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../utilities/firebase/firebase.config'
import COLORS from '../../utilities/constants/Color'
import { RouteStackParamList } from '../../type/RouteStackParamList'
import { useNavigation } from '@react-navigation/native'
import useApp from '../../utilities/hooks/useApp'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AllTodo from "../todo/AllTodo";
import ActiveTodo from "../todo/ActiveTodo";
import CompletedTodo from "../todo/CompletedTodo";

const Tab = createMaterialTopTabNavigator<RouteStackParamList>()
const colors = {
  themeColor: '#4263ec',
  white: '#fff',
  background: '#f4f6fc',
  greyish: '#a4a4a4',
  tint: '#2b49c3',
}

const HEIGHT = Dimensions.get('window').height
type Props = NativeStackScreenProps <RouteStackParamList , 'Home'>
const Home = ({ navigation}: Props) => {
 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [filterString, setFilterString] = useState('')
  const [user , setUser] = useState<{nom: '' ,email : string , password?: string , uid : string}>({
    email : '',
    password : '',
    nom : '',
    uid : '',
  })
  const app = useApp()

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (dates : Date) => {
    app?.setDate(dates)
    console.log(app?.date)
    hideDatePicker()
  }
  const getUser = async () => {
    auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          const user = {
            nom : userAuth.displayName,
            email: userAuth.email,
            uid : userAuth.uid
          }
         setUser(user)
        }
      
    })
    const userData : any  = await AsyncStorage.getItem('userData')
    setUser(JSON.parse(userData))
  }
  React.useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          const user = {
            nom : userAuth.displayName,
            email: userAuth.email,
            uid : userAuth.uid
          }
         setUser(user)
        }
        
      }
    )
      
    
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <DissmissKeyBoard>
        <View style={styles.container}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={showDatePicker}>
              <Icon name="calendar" size={30} style={{ color: colors.white }} />
            </TouchableOpacity>
            

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddTodo')
                }}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 30,
                  width: 45,
                  height: 45, 
                  alignItems: 'center',
                  padding: 2,
                  marginRight: 40,
                 marginTop: 5,
                }}
              >
                <Icon
                  name="plus"
                  size={40}
                  style={{ color: colors.themeColor }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
              navigation.navigate('Profil')
            }}>
              <Icon name="account" size={30} style={{ color: colors.white }} />
            </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ color: colors.white, fontSize: 30 }}>
              {
                user.nom == null ? 'Bienvenue' : `Salut, \n${
                  user.nom
                 }`
              }
            </Text>
            <View style={styles.form}>
              <TextInput
                placeholder="Rechercher"
                placeholderTextColor={colors.greyish}
                style={styles.input}
                value={filterString}
                onChangeText={setFilterString}
              />
              <Icon name="magnify" size={30} style={{ color: COLORS.white }} />
            </View>
          </View>
        </View>
      </DissmissKeyBoard>
      <Toptab />
    </>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.themeColor,
    borderBottomColor: colors.tint,
    borderBottomWidth: 1,
    height: HEIGHT / 3.4,
    
  },
  header: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    backgroundColor: colors.tint,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HEIGHT * 0.02,
    alignItems: 'center',
  },
  input: {
    color: colors.white,
    fontSize: 20,
    width: '80%',
  },
})

const Toptab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.greyish,
        tabBarStyle: {
          backgroundColor: COLORS.themeColor,
          borderTopColor: COLORS.tint,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen name="AddTodo" component={AllTodo} />
      <Tab.Screen name="ActiveTodo" component={ActiveTodo} />
      <Tab.Screen name="CompletedTodo" component={CompletedTodo} />
    </Tab.Navigator>
  )
}
