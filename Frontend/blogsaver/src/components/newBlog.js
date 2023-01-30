import React, { useEffect, useState } from 'react';
import {TextField,Button,Box,Alert, Typography,Paper} from '@mui/material';
import blogService from '../services/blogs';

function NewBlog() {

    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    async function postNew(event){
        event.preventDefault()
        try {      
        const newBlog = await blogService.createBlog({        
              title,
              author,
              url
        })}
        catch (exception) {
            setErrorMessage('Missing fields')      
        setTimeout(() => {        
          setErrorMessage(null)      
        }, 5000)

        }
        setTitle("")
        setAuthor("")
        setUrl("")
    
    }
  return (
    <Box align = "center" justify = "center" alignItems = "center" sx={{py:3.5, backgroundColor: '#ff9380'}}  >
    {errorMessage !== null && <Alert severity="warning">{errorMessage}</Alert>}
    <form onSubmit={postNew} >
        <Typography variant="h4" sx={{ fontStyle: 'italic' }}>What should your audience read next?</Typography>
        <div>
          <TextField label="title" sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={title} onChange={({target}) => setTitle(target.value)}  />
        </div>
        <div>
          <TextField label="author" sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={author} onChange={({target}) => setAuthor(target.value)} />
        </div>
        <div>
          <TextField label="url"  sx={{backgroundColor: '#ffffff',m: 1, width: '45ch'}} value={url} onChange={({target}) => setUrl(target.value)} />
        </div>
        
        <div>
          <Button variant="contained" sx={{backgroundColor: "#9C27B0",m:1.5}} type="submit">
            Add curation
          </Button>
         
        </div>
            
    </form>
    </Box>
  )
}

export default NewBlog;