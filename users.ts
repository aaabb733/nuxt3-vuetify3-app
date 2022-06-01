import { doc, FirestoreDataConverter, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import db from "./db"

export type User = {
  id: string,
  displayName: string,
  photoURL: string,
  createdAt: Date
}

const userConverter:FirestoreDataConverter<User> = {
  fromFirestore(doc):User {
    const data = doc.data()
    return {
      id: doc.id,
      displayName: data.displayName,
      photoURL: data.photoURL,
      createdAt: data.createdAt.toDate()
    }
  },
  toFirestore(user) {
    return user
  }
}


export const getUser = (id: string) => getDoc(doc(db, 'users', id).withConverter(userConverter))
export const addUser = (id: string, displayName, photoURL) => setDoc(doc(db, 'users', id), {displayName, photoURL, createdAt: serverTimestamp()})
export const updateUser = (displayName: string, photoURL: string) => updateDoc(doc(db, 'users', useAuth().value.id), {displayName, photoURL})