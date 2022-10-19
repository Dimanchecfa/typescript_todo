import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import { AppProvider } from './src/utilities/context/app.context'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    
      <AppProvider>
        <Navigation />
      </AppProvider>
   
  );
}


