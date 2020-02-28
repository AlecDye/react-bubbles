import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = () => {
    const token = window.localStorage.getItem("token");
    return (
        <Route />
    )
}

export default PrivateRoute;