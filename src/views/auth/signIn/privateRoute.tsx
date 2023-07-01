import { rest } from 'lodash'
import React, { Component } from 'react'
import {Route,Redirect, RouteProps} from "react-router-dom"

interface PrivateRouteProps extends RouteProps{
    path:string
    component:React.ComponentType<any>
}

const PrivateRoute : React.FC<PrivateRouteProps> = ({
    component:Component,
    ...rest
}) =>{
    const isAuthenticated = localStorage.getItem("token")
    
    return(
        <Route
        {...rest}
        render = {(props) =>
            isAuthenticated?(
                <Component{...props} />
            ) :(
                <Redirect to="/sign-in" />
            )
        }
        />
    )
}

export default PrivateRoute