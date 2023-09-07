import { Schema, model } from 'mongoose'
import { SessionOrigin } from './session.interface'

export class SessionPayload {
    telegramUserId?: string
}

export interface ISession {
	sessionId: string
	files: string[]
    origin: SessionOrigin
    sessionPayload?: SessionPayload 
}

const SessionSchema = new Schema<ISession>({
	sessionId: { type: String, unique: true },
	files: { type: [String] },
    origin: { type: String }
})

export const Session = model<ISession>('Session', SessionSchema);
