import classNames from 'classnames'
import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

export default function Width({ children, className }: IProps) {
  return <div className={classNames('width', className)}>{children}</div>
}
