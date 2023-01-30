import React from 'react'
import Blog from './blogs';
import { Container,Card,Grid} from '@mui/material';
import { useState, useEffect } from 'react';
import blogService from '../services/blogs';

function Display() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

  return (
    /* Blog Content */
    <Grid container spacing={2}>    
    {blogs.map(blog =>
    <Grid item xs={12} md={6}>
      <Blog key={blog.id} blog={blog}/>
    </Grid>
    )}
    </Grid>
  )
}

export default Display;