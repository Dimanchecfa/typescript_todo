import {updateDoc , doc , deleteDoc, onSnapshot} from "firebase/firestore";
import { Alert } from "react-native";
import {db} from "../utilities/firebase/firebase.config";

export const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const month = `${d.getMonth()}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
};

export const handleToggle = async(todo : Todo) => {
    const todoRef = doc(db, "todo", todo?.id);
  await  updateDoc(todoRef, {
        isCompleted: !todo?.isCompleted,
    });
}

export const deleteTodo = async (todo : Todo) => {
    const todoRef = doc(db, "todo", todo.id);
   Alert.alert(
         "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        await deleteDoc(todoRef);
                    }
                }
            ]
        )
   
}
export const editTodo = async (todo : Todo) => {
    const todoRef = doc(db, "todo", todo.id);
    await updateDoc(todoRef, {
        title: todo.title,
        date: todo.date,
    });
}


export const formatTitle = (text : string) => {
    if(text?.length > 10){
        return text.substring(0,10) + "...";
    }
    return text;
}

export const formatDescription = (text : string) => {
    if(text?.length > 25) {
        return text.substring(0 , 20) + "..."
    }
    return text

}


export const generateToken = () => {
    return Math.floor(Math.random() * 1000000000);
}




