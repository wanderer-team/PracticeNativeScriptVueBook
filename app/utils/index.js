import moment from 'moment'
moment.locale('ja')

export const separatedComma = (val) => {
  return String(val).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}

export const getDateFormat = (dateStr) => {
  const date = moment(dateStr)
  return date.format('YYYY年MM月DD日')
}
