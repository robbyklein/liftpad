/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Workouts from './pages/Workouts'
import Login from './pages/Login'
import Signup from './pages/Signup'
import authStore from './stores/authStore'
import RequireAuth from './modules/RequireAuth'
import WorkoutBuilder from './pages/WorkoutBuilder'

function Router() {
  const s = authStore()

  useEffect(() => {
    s.validate()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <RequireAuth>
              <Workouts />
            </RequireAuth>
          }
        />
        <Route
          path="/workouts/new"
          element={
            <RequireAuth>
              <WorkoutBuilder />
            </RequireAuth>
          }
        />
        <Route
          path="/workouts/:id"
          element={
            <RequireAuth>
              <WorkoutBuilder />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

const rootEl = document.getElementById('application')

if (rootEl) {
  const root = createRoot(rootEl)
  root.render(<Router />)
}
