import API, { graphqlOperation } from '@aws-amplify/api'
import { createCart, deleteCart } from '../../../src/graphql/mutations'
import { listCarts } from '../../../src/graphql/queries'

export async function fetchCartApi(userId) {
  const res = await API.graphql(
    graphqlOperation(listCarts, {
      filter: { userId: { eq: userId } },
    })
  )
  return res.data.listCarts
}

export async function addCartApi(payload) {
  const res = await API.graphql(graphqlOperation(createCart, payload))
  return res
}

export async function deleteCartItemApi(payload) {
  const res = await API.graphql(graphqlOperation(deleteCart, payload))
  return res
}
