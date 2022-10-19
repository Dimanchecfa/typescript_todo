import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../../utilities/firebase/firebase.config'
import {formatDate, handleToggle} from '../../../services'
import useApp from '../../../utilities/hooks/useApp'
import {RouteStackParamList} from "../../../type/RouteStackParamList";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

type Props = NativeStackScreenProps <RouteStackParamList , 'ActiveTodo'>
const ActiveTodo = ({navigation} : Props) => {
  const [loading, setLoading] = useState(true)
  const [todoActive, setTodoActive] = useState<any[]>([])
  const app = useApp()
  
  
  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodoActive(
        snapshot.docs
          
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((todo) => todo?.time == formatDate(app?.date)  && todo?.isCompleted == false),
      )
      setLoading(false)
    })
  }, [formatDate(app?.date)])



  return (
    <>
    {
      loading ? <Spinner /> : (
        <ScrollView style={styles.container}>
        <Text style={{fontSize: 20, marginVertical: 10 , marginHorizontal: 20 ,color : COLORS.black}}>
          Mes taches actives du {
            formatDate(app?.date) === formatDate(new Date()) ? 'jour' : formatDate(app?.date)
          }
          
        </Text>
        {
          todoActive.length > 0 ? (
            todoActive
         
          .map((todo, index) => (
            <Card
              onPress={() => {}}
              title={todo.title}
              description={todo.description}
              onDelete={() => {
                console.log(todo.id)
              }}
              onEdit={() => {

                navigation.navigate('EditTodo', { title: todo?.title, description: todo?.description, date: todo?.dates, id: todo?.id , time : todo?.time})
            }}
              date={todo.time}
              key={index}
              checked={todo.isCompleted}
              onChange={() => handleToggle(todo)}
            />
          ))
          ) : (
            <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text
                      style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}
                    >
                        Aucune tâche active
                      
                    </Text>
                  </View>
          )
        }

      </ScrollView>
      )
    }
      
    </>
  )
}

export default ActiveTodo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
