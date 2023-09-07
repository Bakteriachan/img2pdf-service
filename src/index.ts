import Express from 'express'
import { create_database } from './database'
import sessionRouter from './apps/sessions/session.router'

create_database().then(() => console.log('DATABASE CONNECTED')).catch(console.error)

const app = Express()

app.use('/sessions', sessionRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Application listening on PORT ${PORT}`))
