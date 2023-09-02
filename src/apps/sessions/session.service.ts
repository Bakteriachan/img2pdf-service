import { Request, Response, NextFunction } from 'express'
import { ISession, Session } from './session.schema'
import { SessionNotFoundException } from './session.exception'


export default {
	create: async (data: ISession) => {
		const session = new Session(data);
		await session.save()
		return session
	},
	getBySessionId: async (sessionId: string) => {
		const session = await Session.findOne({ sessionId }).exec()
		if(!session) throw new SessionNotFoundException(sessionId)	
		return session
	},
	appendFiles: async (sessionId: string, paths: string[]) => {
		const session = await Session.findOne({ sessionId }).exec()
		if(!session) throw new SessionNotFoundException(sessionId)
		Session.updateOne({ sessionId }, { $push: { files: { $each: paths } }}).exec()
		session.files.push(...paths)
		return session
	}
}
