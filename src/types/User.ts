export interface User {
  uid: string
  email: string | null
  displayName: string | null
  avatarUrl: string | null
  token: string | null
}

export interface AuthState {
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}
