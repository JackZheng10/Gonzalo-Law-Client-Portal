import React, { Component } from 'react'

export default class dashboard extends Component {



    render() {
        return (
<div>
    <h1 className="mt-4">Dashboard</h1>
    <p className="lead mb-3">Welcome </p>
    <button
        href="/users/logout"
        className="btn btn-secondary">
        Logout
    </button>
</div>
        )
    }
}
