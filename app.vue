<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import { signInAnonymously } from 'firebase/auth';

const googlesignin = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider())
}
const anonymoussignin = () => {
  signInAnonymously(getAuth())
}
const signout = () => {
  signOut(getAuth())
  useRouter().push('/')
}
const auth = useAuth()

const drawer = ref(false)
</script>

<template>
<v-app>

  <!-- <v-navigation-drawer temporary absolute v-model="drawer">
    <v-list>
      <v-list-item link class="pa-4">
        <v-list-item-icon class="mr-3" icon="mdi-home" />
        <v-list-item-title>ホーム</v-list-item-title>
      </v-list-item>
      <v-list-item link class="pa-4">
        <v-list-item-icon class="mr-3" icon="mdi-account" />
        <v-list-item-title>アカウント</v-list-item-title>
      </v-list-item>
      <v-list-item link class="pa-4">
        <v-list-item-icon class="mr-3" icon="mdi-cog" />
        <v-list-item-title>設定</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->

  <v-app-bar>
    <v-app-bar-title>Nuxt3 App</v-app-bar-title>
    
    <v-row v-if="auth">
      <v-col>
        <v-btn to="/">ホーム</v-btn>
      </v-col>
      <v-col>
        <v-btn to="/post">投稿</v-btn>
      </v-col>
      <v-col>
        <v-btn to="settings">設定</v-btn>
      </v-col>
    </v-row>
    
    <v-btn v-if="!auth" @click="anonymoussignin">
      ゲストとしてログイン
    </v-btn>
    <v-btn v-if="!auth" @click="googlesignin">
      Google ログイン
    </v-btn>

    <!-- <v-app-bar-nav-icon @click="drawer=!drawer" /> -->

    <v-menu v-if="auth" origin="top center">
      <template v-slot:activator="{props}">
        <v-btn v-bind="props" icon>
          <v-avatar v-if="auth.photoURL" :image="auth.photoURL" />
          <v-avatar v-else color="indigo">
            <span>{{auth.displayName[0]}}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link @click="signout">
          <v-list-item-title>
            ログアウト
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>

  <v-main>
    <v-container>
      <nuxt-page />
    </v-container>
  </v-main>
</v-app>
</template>
