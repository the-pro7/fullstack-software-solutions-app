import React from "react";

export default function NotFound() {
const notFoundStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100dvh",
    background: "#3333335f",
    color: "#222"
}

const headerStyles = {
    fontSize: "6rem",
    letterSpacing: ".5rem"
}

    return <div style={notFoundStyles}>
        <h1 style={headerStyles}>404</h1>
        <p>Sorry, We couldn't find the page you're looking for.</p>
    </div>
}