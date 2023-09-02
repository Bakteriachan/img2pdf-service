import { Schema, model } from 'mongoose'

export interface ISession {
	sessionId: string
	files: string[]
}

const SessionSchema = new Schema<ISession>({
	sessionId: { type: String, unique: true },
	files: { type: [String] },
})

export const Session = model<ISession>('Session', SessionSchema);
