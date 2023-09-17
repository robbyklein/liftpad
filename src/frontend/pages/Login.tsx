import React, { useEffect } from 'react'
import loginStore from '../stores/loginStore'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authStore from '../stores/authStore'
import AuthBox from '../components/AuthBox'
import Field from '../components/Field'
import Button from '../components/Button'
import StatusBox from '../components/StatusBox'

export default function Login() {
  const s = loginStore()
  const as = authStore()
  const navigate = useNavigate()
  const location = useLocation()
  const isConfirm = location.search.indexOf('please-confirm') > -1
  const isConfirmed = location.search.indexOf('confirm-success') > -1

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await s.login()
      as.setAuthenticated(true)
      navigate('/')
    } catch (err: any) {
      s.setError(err.response.data.error)
    }
  }

  useEffect(() => {
    return () => {
      s.reset()
    }
  }, [])

  return (
    <AuthBox title="Login" links={[{ to: '/signup', label: 'Need an account? Signup.' }]}>
      <form onSubmit={handleLogin} className="space-y-3">
        {s.error !== '' && <StatusBox color="danger">{s.error}</StatusBox>}
        {s.error === '' && isConfirm && (
          <StatusBox>Check your email for a confirmation link.</StatusBox>
        )}
        {s.error === '' && isConfirmed && <StatusBox>Email address confirmed!</StatusBox>}
        <Field
          type="email"
          name="email"
          label="Email address"
          placeholder="example@email.com"
          onChange={s.changeField}
          value={s.form.email}
        />

        <Field
          type="password"
          name="password"
          label="Password"
          onChange={s.changeField}
          value={s.form.password}
        />

        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </AuthBox>
  )
}
