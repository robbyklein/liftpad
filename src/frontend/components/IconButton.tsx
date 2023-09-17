import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  type?: 'button' | 'submit'
  to?: string
  onClick?(): void
}

export default function IconButton({ type, children, to, onClick }: IProps) {
  const cls = classNames('icon-button')

  if (to) {
    return (
      <Link className={cls} to={to}>
        {children}
      </Link>
    )
  } else if (type) {
    return (
      <button onClick={onClick} className={cls} type={type}>
        {children}
      </button>
    )
  } else {
    return <></>
  }
}
