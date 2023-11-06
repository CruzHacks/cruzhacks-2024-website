import React from "react"
import { Route, Routes } from "react-router-dom"
import RoleProtectedRoute from "./components/protectedRoutes/RoleProtectedRoute"
import PortalRedirectRoute from "./components/protectedRoutes/PortalRedirectRoute"
import UnauthenticatedRoute from "./components/protectedRoutes/UnauthenticatedRoute"
import Home from "./views/home"
import Login from "./views/Login"
import Signup from "./views/Signup"
import NotFound from "./views/NotFound"
import HackerPortal from "./views/portal/hacker"
import AdminPortal from "./views/portal/admin"
import DashboardAdmin from "./views/portal/admin/DashboardAdmin"
import ApplicationsAdmin from "./views/portal/admin/applications"
import UsersAdmin from "./views/portal/admin/users"
import TeamsAdmin from "./views/portal/admin/teams"
import ApplicationApplicant from "./views/portal/applicant/ApplicationApplicant"
import PortalApplicant from "./views/portal/applicant"
import DashboardApplicant from "./views/portal/applicant/DashboardApplicant"
import useAuth from "./hooks/useAuth"

const App: React.FC = () => {
  const {
    auth: { loading },
  } = useAuth()

  if (loading) {
    return <div className='sr-only'>loading</div>
  }

  return (
    <Routes>
      <Route index element={<Home />} />

      {/* You cannot be logged in to access these routes*/}
      <Route element={<UnauthenticatedRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      {/* You must be logged in to access these routes*/}
      <Route path='portal' element={<PortalRedirectRoute />} />

      <Route element={<RoleProtectedRoute allowedRole='applicant' />}>
        <Route path='portal/applicant' element={<PortalApplicant />}>
          <Route index element={<DashboardApplicant />} />
          <Route path='application' element={<ApplicationApplicant />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute allowedRole='hacker' />}>
        <Route path='portal/hacker' element={<HackerPortal />}>
          {/* Hacker Portal sub-routes go here*/}
        </Route>
      </Route>
      <Route element={<RoleProtectedRoute allowedRole='admin' />}>
        <Route path='portal/admin' element={<AdminPortal />}>
          <Route index element={<DashboardAdmin />} />
          <Route path='applications' element={<ApplicationsAdmin />} />
          <Route path='teams' element={<TeamsAdmin />} />
          <Route path='users' element={<UsersAdmin />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
