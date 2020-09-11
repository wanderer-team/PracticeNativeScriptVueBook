import { Auth } from 'aws-amplify'

export async function signUp(username, password) {
  try {
    const user = await Auth.signUp({
      username,
      password,
    })
    return user
  } catch (error) {
    console.error('error signing up:', error)
  }
}

export async function confirmSignUp(username, code) {
  try {
    await Auth.confirmSignUp(username, code)
  } catch (error) {
    console.error('error confirming sign up', error)
  }
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password)
    return user
  } catch (error) {
    console.error('error signing in', error)
  }
}

export async function signOut() {
  try {
    await Auth.signOut()
  } catch (error) {
    console.error('error signing out: ', error)
  }
}
