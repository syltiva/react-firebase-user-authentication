import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            await navigate('/login')
        }   catch {
            setError('Could not Log Out')
        }

    }
  return (
    <>
        <Card>
         <Card.Body>
         <h2 className="text-center mb-4">homeWebPage placeholder</h2>
         {error && <Alert variant="danger">{error}</Alert>} 
         <strong>Email:</strong> {currentUser.email}

          </Card.Body>
        </Card>
        <div className= "w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
        </div>
    </>
  )
}
