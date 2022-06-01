import { addDoc, collection, deleteDoc, doc, FirestoreDataConverter, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore"
import db from "./db"
import { getUser } from "./users"

export type Post = {
  id: string,
  author: string,
  content: string,
  createdAt: Date
}

const postConverter:FirestoreDataConverter<Post> = {
  fromFirestore(doc): Post {
    const data = doc.data()
    return {
      id: doc.id,
      author: data.author,
      content: data.content,
      createdAt: data.createdAt.toDate()
    }
  },
  toFirestore(post: Post) {
    return post
  }
}

export const getPosts = () => getDocs(query(collection(db, 'posts').withConverter(postConverter), orderBy('createdAt', 'desc')))
export const addPost = (post: {author: string, content: string}) => addDoc(collection(db, 'posts'), {...post, createdAt: serverTimestamp()})
export const deletePost = (id: string) => deleteDoc(doc(db, 'posts', id))

export const initPosts = () => {
  const posts = usePosts()
  const users = useUsers()
  posts.value = []
  const now = new Date().getTime()
  getPosts().then(snapshots => {
    snapshots.forEach(snapshot => {
      const post = snapshot.data()
      if (!(post.author in users.value) || (now - users.value[post.author].fetchedAt.getTime()) / 1000 > 60) {
        getUser(post.author).then(snapshot => {
          users.value[post.author] = {user: snapshot.data(), fetchedAt: new Date()}
        })
      }
      posts.value.push(post)
    })
  })
}