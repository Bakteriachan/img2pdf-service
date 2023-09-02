import { connect } from 'mongoose'

export async function create_database(url?: string) {
	if(!url) url = process.env.MONGO_URL || 'mongodb://localhost:27017/db'
	await connect(url)
}
