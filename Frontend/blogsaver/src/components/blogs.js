import React, { useEffect, useState } from 'react'
import {Card, Typography, CardContent, Button, CardActions, CardMedia} from '@mui/material';
import imageService from '../static/images';




function Blogs({blog}) {
  const [images,getImages]=useState([]);

  useEffect(()=>{
    const ans = imageService.getImages()
    .then(pics => getImages(pics)) 
    console.log(ans,"and",images)
  },[])

  return (
    <Card sx={{ maxWidth: 345 }} variant="outlined">
      <CardMedia
        component="img"
        height="140"
        image={images[(Math.floor(Math.random()*29) + 1)].download_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{blog.likes} clout</Button>
      </CardActions>
    </Card>
    
  )
}

export default Blogs;