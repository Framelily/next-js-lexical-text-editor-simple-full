import { Fragment, useEffect, useState, type FC, type ReactNode } from 'react'

import Head from 'next/head'
import { useSession } from 'next-auth/react'

import HeaderTop from './HeaderTop'
import Sidebar from './Sidebar'

import { ContainerBodyBackoffice, WrapperMainStyled } from '@/styles/layout.styled'
import { convertPermissionToString } from '@/libs/parser'

interface IProps {
  children: ReactNode
  title: string
  backPage?: boolean
}

const BackofficeLayout: FC<IProps> = ({ title, children, backPage }) => {
  const { data: session } = useSession()
  const [showSidebarData, setShowSidebarData] = useState<boolean>(true)
  const [hideSidebar, setHideSidebar] = useState<boolean>(false)
  const permissionKeys = convertPermissionToString(session?.user?.permissionString)

  useEffect(() => {
    if (
      (permissionKeys?.length === 1 && permissionKeys[0] === 'ADMIN_PERMI_MY_TASK') ||
      (permissionKeys?.length === 2 && permissionKeys[1] === 'ADMIN_PERMI_VIEW_CUSTOMER_HISTORY')
    ) {
      setHideSidebar(true)
    }
  }, [permissionKeys])

  return (
    <Fragment>
      <Head>
        <title>{`${title} | Backoffice`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href={`/favicon.ico`} />
      </Head>
      <ContainerBodyBackoffice className={showSidebarData ? 'gap-2' : ''}>
        {!hideSidebar && <Sidebar showSidebarData={showSidebarData} setShowSidebarData={setShowSidebarData} />}
        <div className={`main ${showSidebarData ? 'w-full xl:w-[calc(100%-276px)]' : 'w-full'}`}>
          <HeaderTop title={title} showSidebarData={showSidebarData} backPage={backPage} />
          <WrapperMainStyled>{children}</WrapperMainStyled>
        </div>
      </ContainerBodyBackoffice>
    </Fragment>
  )
}

export default BackofficeLayout
