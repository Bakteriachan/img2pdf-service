import Express from 'express'
import { create_database } from './database'
import sessionRouter from './apps/sessions/session.router'

create_database().catch(console.error).finally(() => console.log('DATABASE CONNECTED'))

const app = Express()

app.use('/sessions', sessionRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Application listening on PORT ${PORT}`))
