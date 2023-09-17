import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  type?: 'button' | 'submit'
  to?: string
  fullWidth?: boolean
  small?: boolean
  onClick?(): void
  color?: 'primary' | 'black' | 'danger-line'
}

export default function Button({
  type,
  children,
  to,
  fullWidth,
  onClick,
  small,
  color = 'primary',
}: IProps) {
  const cls = classNames(`button button--${color}`, {
    'button--full-width': fullWidth,
    'button--small': small,
  })

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
