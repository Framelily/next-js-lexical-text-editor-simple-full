import { useEffect, useState, type FC } from 'react'

import { Button, Collapse, Divider, Tooltip } from 'antd'
import { TbChevronUp, TbChevronsLeft, TbHomeCog } from 'react-icons/tb'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import getConfig from 'next/config'
import { useQuery } from '@tanstack/react-query'

import { SidebarStyled } from '@/styles/layout.styled'
import menu from '@/configs/menu'
import type { IMenu, IMenuItem } from '@/types/modules/Base'
import { convertPermissionToString } from '@/libs/parser'
import { VERSION } from '@/configs'
import { WebService } from '@/services'
import menuPremission from '@/configs/menuPermission'

const { publicRuntimeConfig } = getConfig()

interface IProps {
  showSidebarData: boolean
  setShowSidebarData: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: FC<IProps> = ({ showSidebarData, setShowSidebarData }) => {
  const { data: session } = useSession()
  const {
    push,
    pathname,
    query: { id, titleMain, titleProductMain, title },
  } = useRouter()
  const [menuStaff, setMenuStaff] = useState<IMenu[]>([])
  const pathSettingProduct = '/setting-product'
  const pathProductManage = '/product-manage'
  const pathProductManageMain = `${pathProductManage}/[id]`
  const pathProductManageSub = `${pathProductManage}/${id}?titleProductMain=${titleProductMain}`
  const pathSettingProductMain = `${pathSettingProduct}?titleMain=${titleMain}`
  const pathSettingProductSub = `${pathSettingProduct}/${id}?titleMain=${titleMain}&title=${title}`

  const permissionKeys = convertPermissionToString(session?.user?.permissionString)

  const { data: interfacesMenuList } = useQuery({
    queryKey: ['interfacesMenuList'],
    queryFn: () => WebService.interfacesMenuList(),
  })

  const checkActiveMenu = (list: IMenuItem[], path: string): string => {
    if (path.includes(pathSettingProduct)) {
      return path === pathSettingProductMain ? path : ''
    }

    if (path.includes(pathProductManage)) {
      return path === pathname ? path : ''
    }

    return list?.some((item) => pathname.includes(item?.path ?? '')) ? path : ''
  }

  useEffect(() => {
    if (menu && interfacesMenuList?.length > 0) {
      const newMenuInsert = []

      newMenuInsert.push({
        label: 'การจัดการสินค้า',
        path: `/product-manage/[id]`,
        icon: '',
        list: interfacesMenuList?.map((item) => ({
          label: item?.categoryName,
          path: `${pathProductManage}/${item?.categoryId}?titleProductMain=${item.categoryName}`,
        })),
        permissionKey: 'ADMIN_PERMI_MANAGE_PRODUCT',
        permissionId: 1,
        permissionSub: [],
        groupKey: 'productManage',
      })

      interfacesMenuList?.map((item) =>
        newMenuInsert.push({
          label: item.categoryName,
          path: `${pathSettingProduct}?titleMain=${item.categoryName}`,
          icon: '',
          list: item?.list?.map((itemSub) => ({
            label: itemSub?.name,
            path: `${pathSettingProduct}/${itemSub?.id}?titleMain=${item.categoryName}&title=${itemSub?.name}`,
          })),
          permissionKey: 'ADMIN_PERMI_MANAGE_INTERFACE',
          permissionId: 2,
          permissionSub: [],
          groupKey: 'settingProduct',
        }),
      )

      const productManageIndex = menu.findIndex((item) => item.groupKey === 'productManage')
      const updatedMenu = [...menu.slice(0, 1), ...newMenuInsert, ...menu.slice(productManageIndex + 2)]

      // เช็กก่อนว่าค่าเมนูเปลี่ยนแปลงหรือไม่
      setMenuStaff((prevMenu) => {
        if (JSON.stringify(prevMenu) === JSON.stringify(updatedMenu)) {
          return prevMenu
        }
        if (session?.user?.roleId !== 1) {
          return updatedMenu.filter((item) => permissionKeys?.includes(item.permissionKey))
        }
        return updatedMenu
      })

      if (pathname === '/product-manage') {
        const fristPathProductManage = updatedMenu.find((item) => {
          return item.groupKey === 'productManage'
        })
        push(`${fristPathProductManage?.list[0].path}`)
      }

      if (pathname === '/setting-product') {
        const fristPathSettingProduct = updatedMenu.find((item) => {
          return item.groupKey === 'settingProduct'
        })
        push(`${fristPathSettingProduct?.list[0].path}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interfacesMenuList, session?.user?.roleId])

  const checkTitleDividerGroup = (groupKey: string, index: number) => {
    const beforeMenu = menuStaff[index - 1]

    const groupMenuItem = menuPremission?.find((item) => item?.groupKey === groupKey)

    if (beforeMenu?.groupKey !== groupKey) {
      return (
        <div>
          <Divider />
          <p className="text-[#a4a4a4] text-sm ml-2 mb-1">{groupMenuItem?.label}</p>
        </div>
      )
    }
  }

  const checkActiveSubMenu = (path: string, type: string): string => {
    if (path.includes(pathSettingProduct)) {
      return (type === 'main' && path === pathSettingProductMain) || (type === 'sub' && path === pathSettingProductSub) ? ' active' : ''
    }

    if (path.includes(pathProductManage)) {
      return (type === 'main' && path === pathname) || (type === 'sub' && path === pathProductManageSub) ? ' active' : ''
    }
  }

  return (
    <div className="out-sidebar">
      <Button
        className={showSidebarData ? 'active' : 'not-active'}
        onClick={() => {
          setShowSidebarData(!showSidebarData)
        }}>
        <TbChevronsLeft color="#fff" size={16} />
      </Button>
      <SidebarStyled className={showSidebarData ? 'show' : 'hide'}>
        <div className="top">
          <div className="min-w-[254px] flex items-center gap-2">
            <Tooltip title={VERSION}>
              <span>
                <TbHomeCog size={24} />
              </span>
            </Tooltip>
            <span className="font-bold">{publicRuntimeConfig?.NEXT_PUBLIC_WEB_NAME}</span>
          </div>
        </div>

        <div className="menu">
          <div className="list">
            {menuStaff.map((item, index) =>
              item?.list?.length === 0 && item?.list ? (
                <div key={index}>
                  {checkTitleDividerGroup(item?.groupKey, index)}
                  <Link href={item?.path} className={`item` + (pathname.includes(item?.path) ? ' active' : '')}>
                    <p>
                      {/* {item?.icon} */}
                      <span>{item?.label}</span>
                    </p>
                  </Link>
                </div>
              ) : (
                <div key={index}>
                  {checkTitleDividerGroup(item?.groupKey, index)}
                  <Collapse
                    className="menu-large"
                    defaultActiveKey={[checkActiveMenu(item?.list, item?.path)]}
                    expandIconPosition={'end'}
                    expandIcon={({}) => <TbChevronUp size={16} className="custom-icon" />}
                    items={[
                      {
                        label: (
                          <div>
                            <p>
                              {/* {item?.icon} */}
                              <span>{item?.label}</span>
                            </p>
                          </div>
                        ),
                        key: item?.path,
                        className: 'item' + checkActiveSubMenu(item?.path, 'main'),
                        children: item?.list?.map(
                          (itemSub: IMenuItem) =>
                            itemSub.label !== '' && (
                              <Link href={itemSub.path} key={itemSub.path} className={'item-sub' + checkActiveSubMenu(itemSub?.path, 'sub')}>
                                <div>
                                  <span>- {itemSub.label}</span>
                                </div>
                              </Link>
                            ),
                        ),
                      },
                    ]}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </SidebarStyled>
    </div>
  )
}

export default Sidebar
