import React, { useEffect, useState } from 'react'
import {Card, Typography, CardContent, Button, CardActions, CardMedia, Alert} from '@mui/material';
import imageService from '../static/images';
import blogService from '../services/blogs';


function Blogs({blog}) {
  const [images,getImages]=useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    imageService.getImages().then((pics) => getImages(pics));
  }, []);

  var randNum = (Math.floor(Math.random()*29) + 1);
  
  if(!images)return(<div>Loading...</div>);

  async function deleteBlog(event){
    event.preventDefault()

    if (window.confirm("Do you really want to delete the post?")) {
   var del = event.currentTarget.getAttribute("button-key")
    try {      
      const delBlog = await blogService.delBlog(del)
    }
    catch (exception) {
      setErrorMessage('You can only delete your blogs!')      
  setTimeout(() => {        
    setErrorMessage(null)      
  }, 5000)

  }
}}

async function likeBlog(event){
  event.preventDefault()
 var like = event.currentTarget.getAttribute("button-key")
  try {      
    const blogData = {...blog,likes:blog.likes+1}
    const likeBlog = await blogService.update(like,blogData)
  }
  catch (exception) {
    setErrorMessage('Something broke')      
setTimeout(() => {        
  setErrorMessage(null)      
}, 5000)

}
}

  
  
  if (images.length)return (
    
    <Card  variant="outlined">
      {errorMessage !== null && <Alert severity="warning">{errorMessage}</Alert>}
      
      <CardMedia
        component="img"
        height="140"
        image={images[randNum].download_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <a href={blog.url}>{blog.title}</a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.author}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex',justifyContent: 'space-between' }}>
        <Button button-key={blog.id} size="small" onClick={likeBlog}>{blog.likes} clout</Button>
        <Button button-key={blog.id} size="small" onClick={deleteBlog}>trash X</Button>
    
      </CardActions>
    </Card>  
  ) 

}

export default Blogs;