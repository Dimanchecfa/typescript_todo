import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config'

const AppContext = createContext(null)
type Props = {
  children: any;
};
const AppProvider = ({ children } : Props) => {
 const [date, setDate] = useState<Date>(new Date())
    const value : any = {
    date,
    setDate
  }

  return (
  <AppContext.Provider value={value} >{children}</AppContext.Provider>
  )
}
export { AppContext, AppProvider }
