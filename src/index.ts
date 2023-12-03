import { render } from 'solid-js/web'
import App from './App'
import { CACHE_NAME } from './conf'
import { initialise_data_access } from './data-access'

export async function onLoad() {
	const state = await initialise_data_access(CACHE_NAME)
	render(
		() => App({ state }),
		document.body,
	)
}

window.onload = onLoad
