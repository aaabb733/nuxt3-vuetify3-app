<script setup lang="ts">
import { addPost, initPosts } from '~~/posts';

definePageMeta({
  middleware: 'auth'
})

const content = useState('content', () => '')
const dialog = ref(false)
const dialogmsg = ref('')
const auth = useAuth()
const onSubmit = () => {
  dialog.value = true
  if (content.value.trim() === '') {
    dialogmsg.value = '内容が空白です'
    return
  }
  addPost({author: auth.value.id, content: content.value}).then(() => {
    initPosts()
  })
  dialogmsg.value = '投稿しました'
}
</script>

<template>
<div>
  <Head>
    <Title>投稿</Title>
  </Head>
  <div>
    <h1 class="mt-10 mb-6">投稿</h1>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-textarea v-model="content" label="内容" />
      <v-btn type="submit">投稿</v-btn>
    </v-form>
  </div>
  <v-dialog v-model="dialog">
  <v-card>
    <v-container>
      <v-card-title>
        {{dialogmsg}}
      </v-card-title>
      <v-card-actions>
        <v-row justify="center">
          <v-btn @click="dialog=false; content=''">閉じる</v-btn>
        </v-row>
      </v-card-actions>
    </v-container>
  </v-card>
  </v-dialog>
</div>
</template>