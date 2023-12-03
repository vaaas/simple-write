import B64Storage from './B64Storage'
import { render } from 'solid-js/web'
import App from './App'
import { State } from './state'
import { CACHE_NAME } from './conf'

async function bootstrap(): Promise<State> {
	const cache = await caches.open(CACHE_NAME)
	const b64 = new B64Storage(cache)
	const state = new State(b64, localStorage)
	await state.init()
	return state
}

export async function onLoad() {
	const state = await bootstrap()
	render(
		() => App({ state }),
		document.body,
	)
}
