    import React, { useRef, useState } from 'react'
    import { Card, Form, Button, Alert } from 'react-bootstrap' 
    import { useAuth } from '../context/AuthContext'
    import { Link, useNavigate } from 'react-router-dom'
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
    import { googleAuthentication } from "../Firebase/firebase"


    
    const provider = new GoogleAuthProvider();


    export default function Login() {
        const emailRef = useRef()
        const passwordRef = useRef()        
        const { login } = useAuth()
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(false)
        const navigate = useNavigate()

    
        async function handleSubmit(event) {
            event.preventDefault()

            try { 
                setError("") 
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value) 
                navigate('/')
            }   catch {
                setError('Failed to Log In')

            }
            setLoading(false)
        }

        // Google Login 
        function googleLogin() {
            return signInWithPopup(googleAuthentication, provider)
            .then((result) => {
            setError("")
            setLoading(true)
            console.log(result)
            navigate('/')
            setLoading(false)

            })
            .catch((error) => {
            console.log(error)

            })
            
        }

    return (        
        <>
            <Card>  
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>} 
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                        <br/><br/>
                        <Button disabled={loading} onClick={googleLogin}>
                        <img style={{
                            width:20}} 
                            src="https://drraymondasemente.com/wp-content/uploads/2017/08/google_logo1600.png" 
                            alt="sign in with google" /> 
                             Log In with Google
                        </Button>
                    </Form>
                    <div className= "w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className= "w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
        )
    }
