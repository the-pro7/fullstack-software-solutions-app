import React from "react"
import { useNavigate } from "react-router-dom"
import logoutCurrentUser from "../http-helpers/logout"


export default function WelcomeScreen({showSuccess, success}) {
    const user = localStorage.getItem("user")
    let userToken = localStorage.getItem("token")
    let actualUser = JSON.parse(user)

    const navigate = useNavigate()

    // async function logoutCurrentUser() {
    //     const logoutOptions = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }

    //     if (user && userToken) {
    //         try {
    //             let response = await fetch("http://localhost:5001/api/users/logout", logoutOptions)

    //             if (response.ok) {
    //                 localStorage.clear()
    //                 navigate("/login")
    //                 console.log("Logged out successfully")

    //             }
    //         } catch (error) {
    //             console.log(error.stack)
    //         }
    //     }
    // }

    return <>
    <h1>Hello {actualUser.name} with email {actualUser.email}</h1>
    <button onClick={() => logoutCurrentUser(user, userToken, navigate)}>Logout</button>
    </>
}