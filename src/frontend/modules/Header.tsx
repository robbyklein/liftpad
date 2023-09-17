import React from 'react'
import Width from '../components/Width'
import { Link } from 'react-router-dom'
import PlusIcon from '../svg/PlusIcon'

interface IProps {
  children: React.ReactNode
}

export default function Header({ children }: IProps) {
  return (
    <header className="header">
      <Width>
        <div className="header__flex">
          <h1 className="header__logo">
            <Link to="/">
              <img src="/logo.png" alt="logo" />
              <span>LiftPad</span>
            </Link>
          </h1>
          <div className="header__right">{children}</div>
        </div>
      </Width>
    </header>
  )
}
