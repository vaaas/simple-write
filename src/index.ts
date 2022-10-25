import B64Storage from './B64Storage';
const CACHE_NAME = 'cache'
import { render } from 'solid-js/web'
import App from './views/App';

window.onload = async () => {
	const cache = await caches.open(CACHE_NAME)
	return render(
		() => App({ cache: new B64Storage(cache) }),
		document.body,
	)
}
