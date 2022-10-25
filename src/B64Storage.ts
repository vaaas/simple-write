export default class B64Storage {
	cache: Cache

	constructor(cache: Cache) { this.cache = cache }

	async get(x: string) {
		const response = await this.cache.match(`http://${x}`)
		if (!response) return undefined
		return response.text()
	}

	async set(k: string, v: string) {
		this.cache.put(`http://${k}`, new Response(v))
		return this
	}
}
