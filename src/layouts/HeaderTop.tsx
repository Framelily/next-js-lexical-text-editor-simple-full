import { useEffect, useState, type FC } from 'react'

import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { TbLogout } from 'react-icons/tb'

import { HeaderTopStyled } from '@/styles/layout.styled'

interface IProps {
  title: string
  showSidebarData?: boolean
  backPage?: boolean
}

const HeaderTop: FC<IProps> = ({ title, showSidebarData, backPage }) => {
  const { data: session } = useSession()
  const { back } = useRouter()

  return (
    <HeaderTopStyled>
      <div className={`flex items-center gap-1 ${showSidebarData ? 'ml-0' : 'ml-0'}`}>
        {backPage && <IoArrowBackCircleOutline className="cursor-pointer" size={24} onClick={() => back()} />}
        <p>{title}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>
          <span>{session?.user?.username}</span>
        </p>
        <TbLogout size={20} onClick={() => signOut()} className="cursor-pointer" />
      </div>
    </HeaderTopStyled>
  )
}

export default HeaderTop
