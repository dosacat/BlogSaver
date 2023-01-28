import './App.css';
import { useState, useEffect } from 'react';
import Blog from './components/blogs';
import blogService from './services/blogs'
import { Container,Card } from '@mui/material';

function App() {
  
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])
  
  return (
    <div>
      <h2>Curate.io</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
    
}

export default App;
