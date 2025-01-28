import { TbUserCog } from 'react-icons/tb'

import type { IMenu } from '@/types/modules/Base'

const menu = [
  {
    label: 'รายการสเปคที่เข้ามา',
    path: '/spec-manage',
    icon: <TbUserCog size={20} className="custom-icon" />,
    list: [],
    permissionKey: 'ADMIN_PERMI_MANAGE_SPECBUY',
    permissionId: 4,
    permissionSub: [],
    groupKey: 'specManage',
  },
  {
    label: 'จัดการสินค้าคงเหลือ',
    path: '/stock-manage',
    icon: <TbUserCog size={20} className="custom-icon" />,
    list: [],
    permissionKey: 'ADMIN_PERMI_MANAGE_STOCK',
    permissionId: 3,
    permissionSub: [],
    groupKey: 'inventoryManage',
  },
  {
    label: 'จัดการพนักงาน',
    path: '/staff-manage/staff',
    icon: <TbUserCog size={20} className="custom-icon" />,
    list: [],
    permissionKey: 'ADMIN_PERMI_MANAGE_STAFF',
    permissionId: 5,
    permissionSub: [],
    groupKey: 'staffManage',
  },
  {
    label: 'จัดการสิทธิ์การเข้าถึง',
    path: '/staff-manage/permission',
    icon: <TbUserCog size={20} className="custom-icon" />,
    list: [],
    permissionKey: 'ADMIN_PERMI_MANAGE_STAFF',
    permissionId: 5,
    permissionSub: [],
    groupKey: 'staffManage',
  },
  {
    label: 'ตั้งค่าข้อมูลร้านค้า',
    path: '/setting-store',
    icon: <TbUserCog size={20} className="custom-icon" />,
    list: [],
    permissionKey: 'ADMIN_PERMI_MANAGE_STORE',
    permissionId: 6,
    permissionSub: [],
    groupKey: 'settingStore',
  },
] as IMenu[]

export default menu
