import { Post } from "~~/posts";

export const usePosts = () => useState<Post[]>('posts', () => [])