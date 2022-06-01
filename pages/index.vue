<script setup lang="ts">
import { deletePost, initPosts } from '~~/posts';
import type { Post } from '~~/posts';

const posts = usePosts()
const dialog = ref(false)

const onDelete = () => {
  if (deleteTargetPost.value === null) {
    return
  }
  deletePost(deleteTargetPost.value.id)
  posts.value = posts.value.filter(post => post.id !== deleteTargetPost.value.id)
  dialog.value = false
}

const deleteTargetPost = ref<Post|null>(null)

</script>

<template>
<div>

  <Head>
    <Title>ホーム</Title>
  </Head>

  <v-container>
    <v-row justify="center">
      <v-btn class="mb-6" icon @click="initPosts">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-row>
  </v-container>
  
  <Post @on-delete="post => {dialog=true; deleteTargetPost=post}" :post="post" v-for="post in posts" :key="post.id" />

  <v-dialog v-model="dialog">
    <v-card>
      <v-container>
        <v-card-title>本当に削除しますか？</v-card-title>
        <v-card-actions>
          <v-row justify="center">
            <v-btn @click="dialog=false">キャンセル</v-btn>
            <v-btn @click="onDelete" color="red">はい</v-btn>
          </v-row>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>

</div>
</template>