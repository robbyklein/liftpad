import React from 'react'
import authStore from '../stores/authStore'
import { Navigate } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
}

export default function RequireAuth({ children }: IProps) {
  const { authenticated, ready } = authStore()

  if (!ready) return <></>
  if (ready && !authenticated) return <Navigate to="/login" />

  return <>{children}</>
}
