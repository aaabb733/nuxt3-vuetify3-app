<script setup lang="ts">
import { updateUser } from '~~/users';

definePageMeta({
  middleware: 'auth'
})

const dialog = ref(false)
const displayName = useState<string>('displayNameInput', () => '')
const photoURL = useState<string>('photoURLInput', () => '')
const onUpdate = () => {
  dialog.value = true;
  updateUser(displayName.value, photoURL.value);
  const user = useUsers().value[useAuth().value.id].user
  user.displayName = displayName.value
  user.photoURL = photoURL.value
  useUsers().value[useAuth().value.id] = {user, fetchedAt: new Date()}
  useAuth().value.displayName = displayName.value
  useAuth().value.photoURL = photoURL.value
}
const onBack = () => {
  displayName.value = useAuth().value.displayName;
  photoURL.value = useAuth().value.photoURL
}
</script>

<template>
<div class="mt-10">
  <Head>
    <Title>設定</Title>
  </Head>
  <h1 class="mb-6">設定</h1>
  <v-text-field label="名前" v-model="displayName" />
  <v-text-field label="アイコン画像URL" v-model.trim="photoURL" />
  <v-btn class="mr-3" @click="onUpdate">
    更新
  </v-btn>
  <v-btn class="mr-3" @click="onBack">
    戻す
  </v-btn>

  <v-dialog v-model="dialog">
    <v-card>
      <v-container>
        <v-card-title>
          更新しました
        </v-card-title>
        <v-card-actions>
          <v-row justify="center">
            <v-btn @click="dialog=false">閉じる</v-btn>
          </v-row>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>

</div>
</template>