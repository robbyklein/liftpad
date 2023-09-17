import React, { useEffect } from 'react'
import signupStore from '../stores/signupStore'
import { useNavigate } from 'react-router-dom'
import AuthBox from '../components/AuthBox'
import Button from '../components/Button'
import Field from '../components/Field'
import StatusBox from '../components/StatusBox'

export default function Signup() {
  const s = signupStore()
  const navigate = useNavigate()

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      await s.signup()
      navigate('/login?please-confirm')
    } catch (err: any) {
      s.setError(err.response.data.error)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    s.changeField(name, value)
  }

  useEffect(() => {
    return () => {
      s.reset()
    }
  }, [])

  return (
    <AuthBox title="Sign up" links={[{ to: '/login', label: 'Have an account? Login.' }]}>
      <form className="space-y-3" onSubmit={handleSignup}>
        {s.error !== '' && <StatusBox color="danger">{s.error}</StatusBox>}{' '}
        <Field
          label="Email address"
          type="email"
          name="email"
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
        <Button fullWidth type="submit">
          Sign up
        </Button>
      </form>
    </AuthBox>
  )
}
