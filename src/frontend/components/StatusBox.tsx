import React from 'react'

interface IProps {
  children: React.ReactNode
  color?: 'success' | 'danger'
}

export default function StatusBox({ children, color = 'success' }: IProps) {
  return <div className={`error-box error-box--${color}`}>{children}</div>
}
