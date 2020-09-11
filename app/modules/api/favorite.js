import API, { graphqlOperation } from '@aws-amplify/api'
import { listFavorites } from '../../../src/graphql/queries'
import { createFavorite, deleteFavorite } from '../../../src/graphql/mutations'

export async function addFavoriteApi(payload) {
  const res = await API.graphql(graphqlOperation(createFavorite, payload))
  return res
}

export async function fetchFavoriteItemListApi(userId) {
  const res = await API.graphql(
    graphqlOperation(listFavorites, {
      filter: { userId: { eq: userId } },
    })
  )
  return res.data.listFavorites.items
}

export async function deleteFavoriteItemApi(payload) {
  await API.graphql(graphqlOperation(deleteFavorite, payload))
}
