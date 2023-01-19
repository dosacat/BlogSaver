const dummy = (blogs) => {
    // ...
    return 1;
  }

const totalLikes = (blogs)=>{
    return blogs.reduce((acc,curr)=>acc+curr.likes,0)
}

const favoriteBlog = (blogs)=>{
    return  blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}
  
module.exports = {
    dummy,totalLikes,favoriteBlog
  }