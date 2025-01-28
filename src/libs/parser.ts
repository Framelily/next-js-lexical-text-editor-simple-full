import dayjs from 'dayjs'
import numeral from 'numeral'
import { BigNumber } from 'bignumber.js'
import type { SortOrder } from 'antd/es/table/interface'
import type { GetProp, UploadProps } from 'antd'

import { Order } from '@/enums/base'
import { permissionKeyList } from '@/configs'
import type { IUser } from '@/types/modules/Auth'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const formatNumber = (value: string | number, fixed = true) => {
  const valueCalc = Number(value)
  const number = BigNumber(valueCalc)

  if (number.isGreaterThan(0) && number.isLessThan(0.01)) return number.toFixed()
  if (number.isGreaterThan(1000000000)) return numeral(valueCalc).format(`0,0a`)
  if (fixed) return numeral(valueCalc).format(`0,0.00`)
  return numeral(valueCalc).format(`0,0.[00]`)
}

export const formatDate = (value: Date | string | number, format = 'DD/MM/YYYY - HH:mm') => {
  if (!value) return '-'
  return dayjs(value).format(format)
}

export const covertIndexPage = (index: number, page: number, pageSize: number): number => {
  return (page - 1) * pageSize + index + 1
}

export const convertMessageKey = (message: string): string => {
  return message.charAt(0).toUpperCase() + message.slice(1).toLowerCase().replace(/_/g, ' ')
}

export const getSortOrder = (value: SortOrder): Order => {
  switch (value) {
    case 'ascend':
      return Order.ASC
    case 'descend':
      return Order.DESC
    default:
      return undefined
  }
}

export const checkEmpty = (text: string): string => {
  return text || '-'
}

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const convertPermissionToString = (value: string): string[] => {
  const arr = value
    ?.split('')
    ?.map((item, index) => (item === '1' ? permissionKeyList[index] : null))
    .filter((item) => item !== null)
  return arr
}

export const checkPremission = (user: IUser, permissionKey: string): boolean => {
  if (user?.roleId === 1) return true
  else return convertPermissionToString(user?.permissionString).includes(permissionKey)
}
