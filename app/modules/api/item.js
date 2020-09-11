import API, { graphqlOperation } from '@aws-amplify/api'
import { getItem, listItems, } from '../../../src/graphql/queries'

export async function fetchItemListApi() {
  const res = await API.graphql(
    graphqlOperation(listItems, {
      filter: { delFlg: { eq: false } },
    })
  )
  return res.data.listItems.items
}

export async function fetchItemApi(itemId) {
  const res = await API.graphql(
    graphqlOperation(getItem, {
      id: itemId,
    })
  )
  return res.data.getItem
}
