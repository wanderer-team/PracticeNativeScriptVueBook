import API, { graphqlOperation } from '@aws-amplify/api'
import { getUser } from '../../../src/graphql/queries'
import { createUser, updateUser } from '../../../src/graphql/mutations'

export async function fetchUserApi(userId) {
  const res = await API.graphql(
    graphqlOperation(getUser, {
      id: userId,
    })
  )
  return res.data.getUser
}

export async function createUserApi(payload) {
  const res = await API.graphql(graphqlOperation(createUser, payload))
  return res.data.createUser
}

export async function updateUserApi(user) {
  const res = await API.graphql(graphqlOperation(
    updateUser, {
      input: {
        id: user.id,
        name: user.name,
        birthday: user.birthday
      }
    }
  ))
  return res.data.updateUser
}
