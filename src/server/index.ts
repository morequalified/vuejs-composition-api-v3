import { today, thisWeek, thisMonth, Post } from "../posts"

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
 
app.use(cors())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]

app.get('/posts', function (_req: any, res: { json: (arg0: Post[]) => void }, _next: any) {
  res.json([today, thisWeek, thisMonth])
})

app.post("/posts", (req: any, res: { json: (arg0: Post[]) => void }) => {
  const post = {...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(post)
  res.json(post)
})
 
app.listen(8000, function () {
  console.log('Server listening on port 8000');
})
