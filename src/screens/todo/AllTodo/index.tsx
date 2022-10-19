import React, { useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Card from '../../components/Card'
import useApp from '../../utilities/hook/useApp'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../../utilities/firebase/firebase.config'
import { deleteTodo, formatDate, handleToggle } from '../../services'
import Spinner from '../../components/Spinner'
import COLORS from '../../theme/color'

const AllTodo = ({ navigation }) => {
  const app = useApp()
  const [todos, setTodos] = React.useState([])
  const [loading , setLoading] = React.useState(true)

  useEffect(() => {
    onSnapshot(collection(db, 'todo'), (snapshot) => {
      setTodos(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((todo) => todo?.time == formatDate(app?.date)),
      )
        setLoading(false)


      
    })
   




  }, [formatDate(app?.date)])

 

  return (
    <>
        {
            loading ? <Spinner /> : ( <ScrollView>
                <Text style={{ fontSize: 20, marginVertical: 10 , marginHorizontal: 20 ,color : COLORS.black}}>
                 Les tâches du{' '}
                  {formatDate(app?.date) !== formatDate(new Date())
                    ? formatDate(app?.date)
                    : 'jour'}
                </Text>
        
                {todos.length > 0 ? (
                  todos.map((todo, index) => (
                    <Card
                      onPress={() => {}}
                      title={todo?.title}
                      onDelete={() => deleteTodo(todo)}
                        onEdit={() => {
                           
                            console.log(todo)
                            navigation.navigate('EditTodo', { title: todo?.title, description: todo?.description, date: todo?.dates, id: todo?.id , time : todo?.time})
                        }}
                      description={todo?.description}
                      date={todo?.time}
                      key={index}
                      checked={todo?.isCompleted}
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
                        Aucune tâche pour le moment
                      
                    </Text>
                  </View>
                )}
              </ScrollView>)

        }
    </>
  )
}

export default AllTodo
