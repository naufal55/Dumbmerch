
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

//true
export const PrivateRoute = (props) => {
    const isLogin = props.login
  return (
        isLogin?<Outlet/>:<Navigate to="/"/>
  )
}
//false
export const PrivateOut = (props) => {
    const isLogin = props.login
  return (
        isLogin?<Navigate to="/homepage"/>:<Outlet/>
  )
}