export class SessionNotFoundException extends Error {
	constructor(id: string) {
		super(`Session with id ${id} not found`)
	}
}

export class FileNotFoundInSession extends Error {
	constructor(sessionId: string, filename: string) {
		super(`File ${filename} does not exists in session ${sessionId}`)
	}
}
