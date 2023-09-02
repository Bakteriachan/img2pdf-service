import { Request, Response, NextFunction } from 'express'
import { ISession, Session } from './session.schema'
import { SessionNotFoundException, FileNotFoundInSession } from './session.exception'
import config from '../../config'


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
	},
	getSessionFilePath: async (sessionId: string, filename: string) => {
		const session = await Session.findOne({ sessionId }).exec()
		if(!session) throw new SessionNotFoundException(sessionId)
		if(!session.files.includes(filename)) throw new FileNotFoundInSession(sessionId, filename)
		return `${config.DESTINATION_PATH}/${filename}`
	}
}
