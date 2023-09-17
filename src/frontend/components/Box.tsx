import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
  className?: string
  children?: React.ReactNode
  padded?: boolean
  to?: string
}

export default function Box({ className, children, padded = true, to }: IProps) {
  const cls = classNames('box', { 'box--padded': padded }, className)

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  } else {
    return <div className={cls}>{children}</div>
  }
}
