const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
    
}   

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {   
    const authors = {}
    blogs.forEach(blog => {
        if (authors[blog.author]) {
            authors[blog.author] += 1
        } else {
            authors[blog.author] = 1
        }
    })
    const reducer = (most, item) => {
        return most.blogs > item.blogs ? most : item
    }
    const authorList = Object.keys(authors).map(author => {
        return { author: author, blogs: authors[author] }
    })
    return authorList.reduce(reducer)
}

const mostLikes = (blogs) => {
    const authors = {}
    blogs.forEach(blog => {
        if (authors[blog.author]) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
    })
    const reducer = (most, item) => {
        return most.likes > item.likes ? most : item
    }
    const authorList = Object.keys(authors).map(author => {
        return { author: author, likes: authors[author] }
    })
    return authorList.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}