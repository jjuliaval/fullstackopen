import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('notif')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser)) 
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch {
      setClassName('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser') 
    blogService.setToken('')
    setUser(null)
  }

  const handleNewBlog = async (blogObject) => {

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    
    blogFormRef.current.toggleVisibility()

    setClassName('notif') 
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleNewBlog}/>
    </Togglable>
  )


if (user === null ) {
  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} style={className} ></Notification>
      {loginForm()}
    </div>
  )
}

return (
  <div>
    <h2>blogs</h2>
    <Notification message={message} style={className} ></Notification>
    <p>{user.name} logged in</p><button onClick={handleLogout}>Logout</button>
    <div>{blogForm()}</div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)
}

export default App