import B64Storage from './B64Storage'
import { State } from './state'

export type { State } from './state'

export async function initialise_data_access(cache_name: string): Promise<State> {
	const cache = await caches.open(cache_name)
	const b64 = new B64Storage(cache)
	const state = new State(b64, localStorage)
	await state.init()
	return state
}
