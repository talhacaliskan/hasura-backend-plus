import 'dotenv/config'

import cookie from 'cookie-parser'
import cors from 'cors'
import { errors } from './utils/errors'
import express from 'express'
import helmet from 'helmet'
import { json } from 'body-parser'
import { limiter } from './utils/limiter'
import { router } from './routes'

const { PORT = 3000 } = process.env

try {
  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(limiter)
  }

  app.use(helmet())
  app.use(json())
  app.use(cors())
  app.use(cookie())

  app.use(router)
  app.use(errors)

  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error(err)
  process.exit(1)
}
