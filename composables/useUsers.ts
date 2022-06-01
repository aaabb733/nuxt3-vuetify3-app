import { User } from "~~/users";

export const useUsers = () => useState<{user: User, fetchedAt: Date}[]>('users', () => [])