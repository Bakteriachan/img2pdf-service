import fs from 'fs'
import type { Express, Request } from 'express'
import { Router } from 'express'
import { v4 } from 'uuid'
import multer from 'multer'
import config from '../../config'
import controller from './session.controller'

const app = Router()

type CallbackType = (error: Error | null, dest: string) => void

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: CallbackType): void => {
		const destination = config.DESTINATION_PATH
		if (!fs.existsSync(destination))
			fs.mkdirSync(destination, { recursive: true })
		cb(null, destination)
	},
	filename: (req: Request, file: Express.Multer.File, cb: CallbackType): void => {
		const filename = `${v4()}-${file.originalname}`
		cb(null, `${filename}`)
	}
})

const upload = multer({ storage })

app.route('/')
	.post(upload.array('files'), controller.create)

app.route('/:sessionId')
	.get(controller.getBySessionId)
	.put(upload.array('files'), controller.appendFiles)

app.get('/:sessionId/file/:filename', controller.getSessionFile)

export default app
