export type UserRole = 'admin' | 'moderator' | 'user'

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  birthDate: string
  image: string
  username: string
  password?: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  role: UserRole
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}
