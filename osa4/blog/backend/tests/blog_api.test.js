const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  console.log('test started')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs = await helper.blogsInDb()

  assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('identifier of the blogs is named id', async () => {
  const blogs = await helper.blogsInDb()

  blogs.forEach((blog) => {
    assert.ok(blog.id)
  })
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'http://testblog.com',
    likes: 0
  }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map((b) => b.title)
  assert(titles.includes('Test blog'))
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'Test blog', 
    author: 'Tester',
    url: 'http://testblog.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('if title and url properties are missing, respond with status code 400', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Tester',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})  

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map((b) => b.title)
  assert(!titles.includes(blogToDelete.title))
})

test('blog likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlogData = {
    title: 'Test blog', 
    author: 'Tester',
    url: 'http://testblog.com',
    likes: 10
  }
    const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 10)
})

after(async () => {
  await mongoose.connection.close()
})