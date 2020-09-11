import API, { graphqlOperation } from '@aws-amplify/api'
import { listHistorys } from '../../../src/graphql/queries'
import { createHistory } from '../../../src/graphql/mutations'

export async function addHistoryApi(payload) {
  const res = await API.graphql(graphqlOperation(createHistory, payload))
  return res
}

export async function fetchHisotryListApi(userId) {
  const res = await API.graphql(
    graphqlOperation(listHistorys, {
      filter: { userId: { eq: userId } },
    })
  )
  return res.data.listHistorys
}
