import React from 'react'
import Header from './Header'
import Loading from '../components/Loading'
import Width from '../components/Width'

interface IProps {
  loading?: boolean
  children?: React.ReactNode
  headerRight?: React.ReactNode
  spacedBody?: boolean
}

export default function Page({ loading, children, headerRight, spacedBody = true }: IProps) {
  return (
    <div className="page">
      <Header>{headerRight}</Header>

      <div className="py-6">
        <Width className={spacedBody ? 'space-y-6' : ''}>
          {loading && <Loading />}
          {!loading && <>{children}</>}
        </Width>
      </div>
    </div>
  )
}
