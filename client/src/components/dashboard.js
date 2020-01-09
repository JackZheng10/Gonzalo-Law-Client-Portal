import React, { Component } from 'react'

export default class dashboard extends Component {
    render() {
        return (
<div>
    <h1 class="mt-4">Dashboard</h1>
    <p class="lead mb-3">Welcome </p>
    <button
        href="/users/logout"
        class="btn btn-secondary">
        Logout
    </button>
</div>
        )
    }
}
