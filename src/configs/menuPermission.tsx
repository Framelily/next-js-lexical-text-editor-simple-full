import type { IMenu } from '@/types/modules/Base'

const menuPremission = [
  {
    label: 'การจัดการสินค้า',
    path: '/product-manage',
    permissionKey: 'ADMIN_PERMI_MANAGE_PRODUCT',
    permissionId: 1,
    groupKey: 'productManage',
  },
  {
    label: 'ตั้งค่าข้อมูลสินค้า',
    path: '/setting-product',
    permissionKey: 'ADMIN_PERMI_MANAGE_INTERFACE',
    permissionId: 2,
    groupKey: 'settingProduct',
  },
  {
    label: 'จัดการสินค้าคงคลัง',
    path: '/stock-manage',
    permissionKey: 'ADMIN_PERMI_MANAGE_STOCK',
    permissionId: 3,
    groupKey: 'inventoryManage',
  },
  {
    label: 'จัดการสเปค',
    path: '/spec-manage',
    permissionKey: 'ADMIN_PERMI_MANAGE_SPECBUY',
    permissionId: 4,
    groupKey: 'specManage',
  },
  {
    label: 'จัดการพนักงาน',
    path: '/staff-manage',
    permissionKey: 'ADMIN_PERMI_MANAGE_STAFF',
    permissionId: 5,
    groupKey: 'staffManage',
  },
  {
    label: 'จัดการร้านค้า',
    path: '/setting-store',
    permissionKey: 'ADMIN_PERMI_MANAGE_STORE',
    permissionId: 6,
    groupKey: 'settingStore',
  },
] as IMenu[]

export default menuPremission
