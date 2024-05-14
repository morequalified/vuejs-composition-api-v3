import { today, thisWeek, thisMonth, Post } from "../posts"

const express = require('express')
const cors = require('cors')
const app = express()
 
app.use(cors())

app.get('/posts', function (_req: any, res: { json: (arg0: Post[]) => void }, _next: any) {
  res.json([today, thisWeek, thisMonth])
})
 
app.listen(8000, function () {
  console.log('Server listening on port 8000');
})
