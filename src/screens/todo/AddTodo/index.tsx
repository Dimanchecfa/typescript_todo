
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-ionicons'
import Input from '../../../components/Input'
import DissmissKeyBoard from '../../../components/KeyBoardDismiss'
import Loader from '../../../components/Loader'
import { formatDate } from '../../../services'
import COLORS from '../../../utilities/constants/Color'
import { db } from '../../../utilities/firebase/firebase.config'
import Button from '../../../components/Button'
import DateTimePickerModal from "react-native-modal-datetime-picker"


const HEIGHT = Dimensions.get('window').height
const AddTodo = () => {
  const [date, setDate] = useState(formatDate(new Date()))
  const [loading, setLoading] = React.useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [error, setError] = React.useState<{
    title: string
    description: string
    date: string
  }>({
    title: '',
    description: '',
    date: '',
  })
  const [inputs, setInputs] = React.useState<Todo>({
    title: '',
    description: '',
    date: '',
    isCompleted: false,
  })
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (dates : Date) => {
    hideDatePicker()
    setDate(formatDate(dates))
    console.log(date)
  }
  const validate = async () => {
    setLoading(true)
    Keyboard.dismiss()
    const { title, isCompleted, description } = inputs
    let error = {}
    if (!title) {
     let error = {
        title: !title ? 'Le titre est requis' : '',
        description: '',
        date: '',
      }
      return setError(error);
    }
    const todo = {
      title,
      description,
      isCompleted: false,
      isFavorite: false,
      time: date,
      dates: new Date().toISOString(),
    }

    console.log(todo)
    try {
      await addDoc(collection(db, 'todo'), todo as any)
      setLoading(false)
      setInputs({
        title: '',
        description: '',
        date: '',
        isCompleted: false,
        })
      
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <>
      <DissmissKeyBoard>
        <View style={styles.container}>
          <Text style={styles.text}>Ajouter une tâche</Text>
          <View style={styles.view}>
            <Input
              placeholder="Ajouter un titre"
              value={inputs.title}
              label={'Titre'}
              onChangeText={() => setInputs({ ...inputs, title: inputs.title })}
              error={error.title}
              onBlur={() => setError({ ...error, title: '' })}
            />

            <Input
              placeholder="Prendre des notes"
              iconName="text"
              label="Description"
              value={inputs.description}
              onChangeText={() => setInputs({ ...inputs, description: inputs.description })}
              onBlur={() => setError({ ...error, description: '' })}
              error={error.description}
              isMultiline={true}
            />
            <Text style={styles.label}>Date</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput}>{date}</Text>
              <TouchableOpacity  onPress={showDatePicker}>
                <Icon
                  name="calendar"
                  size={25}
                  style={{ marginRight: 10 }} 
                />
              </TouchableOpacity>
            </View>

            <Button title={'Ajouter'} onPress={validate} />
          </View>
          <Loader visible={loading} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </DissmissKeyBoard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    height: HEIGHT,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  view: {
    marginTop: 20,

    flex: 1,

    width: '100%',
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.themeColor,
    borderRadius: 10,
    height: 50,
  },
  textInput: {
    fontSize: 18,
    width: '80%',
    marginLeft: 20,
  },

  label: {
    fontSize: 14,
    color: COLORS.greyish,
  },
})

export default AddTodo
