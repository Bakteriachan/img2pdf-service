export class SessionNotFoundException extends Error {
	constructor(id: string) {
		super(`Session with id ${id} not found`)
	}
}
