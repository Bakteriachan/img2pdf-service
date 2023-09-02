import { Request, Response, NextFunction } from 'express'
import { v4 } from 'uuid'
import service from './session.service'


export default {
	create: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const paths: string[] = []
			if(req.files instanceof Array){
				for(const file of req.files) {
					paths.push(`${v4()}-${file.originalname}`)
				}
			}
			const session = await service.create({
				sessionId: v4(),
				files: paths,
			})
			res.status(200).send(session)
		} catch(e) {
			next(e)
		}
	},
	getBySessionId: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const session = await service.getBySessionId(req.params.sessionId)
			res.status(200).send(session)
		} catch(e) {
			next(e)
		}
	},
	appendFiles: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const paths: string[] = []
			if(req.files instanceof Array) {
				for(const file of req.files){
					paths.push(`${v4()}-${file.originalname}`)
				}
			}
			const session = await service.appendFiles(req.params.sessionId, paths)
			res.status(200).send(session)
		} catch(e) { 
			next(e)
		}
	}
}
