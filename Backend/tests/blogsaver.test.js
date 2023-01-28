const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogsaver');


const initialUsers=[
  {
  username:"Lilo",
  name:"Stitch",
  password:"sadasmbd"
  },
  {username:"Alora",
    name:"Gugu",
    password:"sahba"
  }]

//save user to database, sign a token for the user and send it with the post/delete request.
const initialBlogs = [
{
  _id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
  
},
{
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0
  
}];

beforeEach(async () => {
  
  await Blog.deleteMany({})  
  let blogObject = new Blog(initialBlogs[0])  
  await blogObject.save()  
  blogObject = new Blog(initialBlogs[1])  
  await blogObject.save()

  await api.post("/api/users")
  .set("Content-Type","application/json")
  .send(initialUsers[0])
},100000)

describe("Get operation",()=>{
test('All blogs are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
  }, 100000)
})

// Come back to testing - npm test -- tests/blogsaver.test.js
  
describe("Posting new blogs",  ()=>{

  test('a valid blog can be added', async () => {
  

  await api
    .post("/api/users")
    .set("Content-Type","application/json")
    .send(initialUsers[1])


// Login to receive the token
const userlogined={
  username:"Lilo",
  password:"sadasmbd"
}

const result = await api.post("/api/login")
  .send(userlogined)

const tok = result.body.token

    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${tok}`)
      
  
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('First class tests')
  })

  test('blog without url is not added', async () => {
    await api
    .post("/api/users")
    .set("Content-Type","application/json")
    .send(initialUsers[1])


// Login to receive the token
const userlogined={
  username:"Lilo",
  password:"sadasmbd"
}

const result = await api.post("/api/login")
  .send(userlogined)

const tok = result.body.token
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${tok}`)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog without title is not added', async () => {
    await api
    .post("/api/users")
    .set("Content-Type","application/json")
    .send(initialUsers[1])


// Login to receive the token
const userlogined={
  username:"Lilo",
  password:"sadasmbd"
}

const result = await api.post("/api/login")
  .send(userlogined)

const tok = result.body.token


    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${tok}`)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

})



  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
    // Login to receive the token
    const userlogined={
      username:"Lilo",
      password:"sadasmbd"
    }

    const result = await api
      .post("/api/login")
      .send(userlogined)

      const tok = result.body.token

      const newBlog = {
        author: "Robert C. Martin",
        title: "You can do this Mandu!",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      }
        
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization',`bearer ${tok}`)

      
      var blogsAtStart = await Blog.find({})
      
      blogAtStart = blogsAtStart.map(blog=>blog.toJSON())
      const blogToDelete = blogsAtStart[2]
  
      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set('Authorization',`bearer ${tok}`)
        .expect(204)
  
      const notesAtEnd = await Blog.find({})
  
      expect(notesAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )
  
      const contents = notesAtEnd.map(r => r.title)
  
      expect(contents).not.toContain(blogToDelete.title)
    })
  })


  afterAll(async () => {
    await mongoose.connection.close()
  })
