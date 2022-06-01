import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { addUser, getUser } from '~~/users'

export default defineNuxtPlugin(nuxtApp => {
  console.log('authinit')
  const auth = useAuth()

  onAuthStateChanged(getAuth(), user => {
    if (user) {
      getUser(user.uid).then(snapshot => {
        if (snapshot.exists()) {
          auth.value = snapshot.data()
        } else {
          addUser(user.uid, user.displayName || 'ゲスト', user.photoURL || '')
          auth.value = {id: user.uid, displayName: user.displayName || 'ゲスト', photoURL: user.photoURL || '', createdAt: new Date()}
        }
        useUsers().value[user.uid] = {user: auth.value, fetchedAt: new Date()}
        useState<string>('displayNameInput').value = auth.value.displayName
        useState<string>('photoURLInput').value = auth.value.photoURL
      })
    }
    else {
      auth.value = null
    }

  })
})