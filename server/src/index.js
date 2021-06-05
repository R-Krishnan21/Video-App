const express = require('express')
require('./db/mongoose')
var cors = require('cors')
const userRouter = require('./routers/user')
const videoRouter = require('./routers/video')
const subscriberRouter = require('./routers/subscribe')
const commentRouter = require('./routers/comment')
const likeRouter = require('./routers/like')

const app = express()
const port = process.env.PORT

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(videoRouter)
app.use(subscriberRouter)
app.use(commentRouter)
app.use(likeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})