<script setup lang="ts">
import { Post } from '~~/posts';

const props = defineProps<{post: Post}>()
const { post } = toRefs(props)

defineEmits<{
  (e: 'onDelete', post: Post): void
}>()

const users = useUsers()
const auth = useAuth()

</script>

<template>
<div>
  <v-card class="mb-6">
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar v-if="users[post.author]?.user.photoURL !== ''" :image="users[post.author]?.user.photoURL" />
          <v-avatar v-else color="indigo">
            <span>
              {{users[post.author]?.user.displayName[0]}}
            </span>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-title class="ml-5">
          {{users[post.author]?.user.displayName}}
        </v-list-item-title>
        <div class="ml-5 text-grey-darken-1" style="font-size: 0.9rem;">
          {{post.createdAt.toLocaleString()}}
        </div>
        <div class="ml-5"></div>
        <v-menu v-if="post.author === auth?.id">
          <template v-slot:activator="{props}">
            <v-btn v-bind="props" icon variant="text">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item @click="$emit('onDelete', post)" link>
                <v-list-item-title>削除</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-list-item>
    </v-list>
    <v-divider />
    <div class="pa-8" style="white-space: pre-wrap;">
      {{post.content}}
    </div>
  </v-card>

</div>
</template>