import React from 'react'
import { Link } from 'react-router-dom'

interface ILink {
  to: string
  label: string
}

interface IProps {
  title: string
  children: React.ReactNode
  links?: ILink[]
}

export default function AuthBox({ children, title, links }: IProps) {
  return (
    <div className="auth-box">
      <h1 className="auth-box__heading">{title}</h1>
      {children}
      {links && (
        <ul className="auth-box__links">
          {links.map((link, i) => {
            return (
              <li key={i}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
