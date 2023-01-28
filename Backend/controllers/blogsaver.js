const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Blog = require('../models/blogsaver');
const User = require('../models/users');

//Bearer token in authorization header and want to retrieve the token, then you should write req. headers['authorization']
//Retrieves just the bearer


//Getting all blog posts
router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
  
  })
  

//Adding new blog posts
router.post('/',async (req,res)=>{
    var blog = req.body
    // decodes the token, or returns the Object which the token was based on, our object is named token.
    //which in ourcase we set to username and id
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET)  
    
    if (!decodedToken.id) {    
      return res.status(401).json({ error: 'token invalid' })  
    }

    // If likes is empty, default 0;
    if(typeof(blog.likes)==='undefined'){
      blog.likes=0
    }

    // //If url or title missing, respond with bad request
    if (!blog.url || !blog.title){
      return res.status(400).end()
    }


    const user_ = await User.findById(decodedToken.id) 

    const newblog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: user_
    })  
  

  const result = await newblog.save()

  user_.notes = user_.blogs.concat(result._id)
  await user_.save()

  res.status(201).json(result)
   
})

 //Allow single blog post to be deleted

  router.delete("/:id", async (req,res)=>{
    const decodedToken = jwt.verify(req.token, process.env.SECRET)  
    
    if (!decodedToken.id) {    
      return res.status(401).json({ error: 'token invalid' })  
    }

    const user_ = await User.findById(decodedToken.id)
    
    const blog = await Blog.findById(req.params.id)
    
    if(blog.user.toString()===user_._id.toString()){
      const result = await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    }
    else{
      res.status(401).json({ error:'token invalid'})
    }
    
    
    
  })

  //allow to update likes in a post
  router.put("/:id",async (req,res)=>{

  const body = req.body

  const blogPost = {
    content: body.content,
    important: body.important,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogPost, { new: true })
  res.status(204).json(updatedBlog)
     
  })

module.exports=router;