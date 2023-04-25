import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const sendVisitorData = () => {
    fetch('log/log-visitor.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

sendVisitorData()
