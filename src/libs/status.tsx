import React from 'react'

import { Tag } from 'antd'

export const convertStatusManageLead = (status: string, count?: number): React.ReactNode => {
  switch (status) {
    case 'PENDING':
      return <Tag color="orange">รอมอบหมาย {count > 0 && `(${count})`}</Tag>
    case 'ASSIGNED':
      return <Tag color="gold">มอบหมายแล้ว {count > 0 && `(${count})`}</Tag>
    case 'PROCESSING':
      return <Tag color="processing">กำลังดำเนินการ {count > 0 && `(${count})`}</Tag>
    default:
      break
  }
}

export const convertStatusAssignLead = (status: string, count?: number): React.ReactNode => {
  switch (status) {
    case 'PENDING':
      return <Tag color="orange">รอมอบหมาย {count > 0 && `(${count})`}</Tag>
    case 'ASSIGNED':
      return <Tag color="gold">มอบหมายแล้ว {count > 0 && `(${count})`}</Tag>
    case 'PROCESSING':
      return <Tag color="processing">กำลังดำเนินการ {count > 0 && `(${count})`}</Tag>
    case 'SUCCESS':
      return <Tag color="success">ดำเนินการเสร็จสิ้น {count > 0 && `(${count})`}</Tag>
    case 'EXPIRED':
      return <Tag color="error">เกินกำหนดการ {count > 0 && `(${count})`}</Tag>
    case 'CLOSED':
      return <Tag color="purple">ปิดงาน {count > 0 && `(${count})`}</Tag>
    default:
      break
  }
}

export const convertStatusIManageLead = (status: string, count?: number): React.ReactNode => {
  switch (status) {
    case 'WAITING':
      return <Tag color="orange">รอดำเนินการ {count > 0 && `(${count})`}</Tag>
    case 'PROCESSING':
      return <Tag color="processing">กำลังดำเนินการ {count > 0 && `(${count})`}</Tag>
    case 'SUCCESS':
      return <Tag color="success">ดำเนินการเสร็จสิ้น {count > 0 && `(${count})`}</Tag>
    case 'EXPIRED':
      return <Tag color="error">เกินกำหนดการ {count > 0 && `(${count})`}</Tag>
    default:
      break
  }
}

export const convertStatusLead = (status: string, count?: number): React.ReactNode => {
  switch (status) {
    case 'TAKE_PROMOTION':
      return <Tag color="success">รับโปรโมชั่น {count > 0 && `(${count})`}</Tag>
    case 'HEAL':
      return <Tag color="magenta">ฮีลใจ {count > 0 && `(${count})`}</Tag>
    case 'BUSY':
      return <Tag color="gold">ไม่สะดวก {count > 0 && `(${count})`}</Tag>
    case 'USING':
      return <Tag color="purple">ยังเหลืออยู่ {count > 0 && `(${count})`}</Tag>
    case 'NOLONGER':
      return <Tag color="error">เลิกใช้ {count > 0 && `(${count})`}</Tag>
    case 'CUTLINE':
      return <Tag color="warning">ตัดสาย {count > 0 && `(${count})`}</Tag>
    case 'UNREACHABLE':
      return <Tag color="geekblue">ติดต่อไม่ได้ {count > 0 && `(${count})`}</Tag>
    case 'NOTINTERESTED':
      return <Tag color="red">ยังไม่สนใจตอนนี้ {count > 0 && `(${count})`}</Tag>
    case 'REFER':
      return <Tag color="blue">สั่งให้คนอื่น {count > 0 && `(${count})`}</Tag>
    case 'NOANSWER':
      return <Tag color="orange">ไม่รับสาย {count > 0 && `(${count})`}</Tag>
    case 'RECONFIRM':
      return <Tag color="volcano">นัดโทรคอนเฟิร์ม {count > 0 && `(${count})`}</Tag>
    case 'WAITING':
      return <Tag>รอโทร {count > 0 && `(${count})`}</Tag>
    default:
      break
  }
}
