const router = require('express').Router();
// const {blogs} = require('/models/blogsaver.js')

var blogs = [
  { 
      "title": "How to be a better player",
      "author": "Mr. Meena Colada",
      "url": "www.therealdeal.com",
      "likes": 10
  },
  { 
      "title": "Why are pigs cuter than bacon",
      "author": "Nomadic Goat",
      "url": "www.simpcity.com",
      "likes": 7
  }
]


//Getting all blog posts
router.get('/', (req, res) => {
    res.json(blogs)
  })
  

//Adding new blog posts
router.post('/',(req,res)=>{
    var blog = req.body
    blogs = blogs.concat(blog)
    res.status(200).end()    
    })

module.exports=router;