import React, { useEffect, useState } from 'react';
import {TextField,Button,Box,Alert, Typography} from '@mui/material';
import loginService from '../services/login';
import blogService from '../services/blogs';
import NewBlog from './newBlog';


function Login() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)

    // Checks if user already logged in in local storage first
    useEffect(() => {    
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    }  }, [])

    const handleLogin = async (event) => {    
        event.preventDefault()    
        try {      
        const user = await loginService.login({        
          username, password,
        })

        window.localStorage.setItem(        
          'loggedNoteappUser', JSON.stringify(user)      
          )

        blogService.setToken(user.token) 
        setUser(user)      
        setUsername('')      
        setPassword('')    
      } catch (exception) {      
        setErrorMessage('Wrong credentials')      
        setTimeout(() => {        
          setErrorMessage(null)      
        }, 5000)    }  
    }

    const handleLogout = (event)=>{
      console.log("exit!")
      event.preventDefault()
      window.localStorage.clear()
      setUser(null)
      setUsername('')      
      setPassword('')  
    }

  return (
    <div>
      {errorMessage !== null && <Alert severity="info">{errorMessage}</Alert>}
      
      
        <Box sx={{
        display: 'flex',
        backgroundColor: '#6573c3',
        
        py:2,
        padding:'normal',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m:5,
        
        },
      }}>
        {user == null ? 
        <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" sx={{backgroundColor: '#ffffff',m: 1, width: '35ch'}} value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          <TextField label="password" type='password' sx={{backgroundColor: '#ffffff',m: 1, width: '35ch'}} value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <div>
          <Button variant="contained" sx={{backgroundColor: '#2c387e',m: 1}} type="submit">
            login
          </Button>
         
        </div>
            
        </form>
        : <Box sx={{ display: 'flex',justifyContent: 'space-between',width: 1, alignItems : "center" }}>
          <Typography variant="h4" color="common.white" sx={{ fontStyle: 'bold' }}>Hi, {user.name}</Typography>
          <Button variant="contained" sx={{backgroundColor: '#2c387e',m:1}} type="submit" onClick={handleLogout}>
            logout
          </Button>
        </Box>}
        </Box>
        {user && <NewBlog/>}


    </div>
  )
}

export default Login;