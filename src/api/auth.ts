import type { LoginCredentials, LoginResponse } from './types'

const API_BASE_URL = 'https://dummyjson.com'

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!loginResponse.ok) {
    const error = await loginResponse.json()
    throw new Error(error.message || 'Login failed')
  }
  const loginData = await loginResponse.json()

  // Get logged user role
  const userResponse = await fetch(`${API_BASE_URL}/users/${loginData.id}`, {
    headers: {
      'Authorization': `Bearer ${loginData.token}`,
    },
  })

  if (!userResponse.ok) {
    throw new Error('Failed to fetch user details')
  }

  const userData = await userResponse.json()

  return {
    ...userData,
    accessToken: loginData.accessToken,
    refreshToken: loginData.refreshToken,
    role: userData.role,
  }
}

export function logoutUser(): void {
  localStorage.removeItem('auth_user')
}
