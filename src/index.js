'use strict'
const CACHE_NAME = 'cache'

const $ = x => document.querySelector(x)

const $$ = x => Array.from(document.querySelectorAll(x))

const read_file = x => new Promise(yes => {
	const reader = new FileReader()
	reader.onload = () => yes(reader.result)
	reader.readAsDataURL(x)
})

class B64Storage {
	constructor(cache) { this.cache = cache }

	async get(x) {
		const response = await this.cache.match(`http://${x}`)
		if (!response) return undefined
		return response.text()
	}

	async set(k, v) {
		this.cache.put(`http://${k}`, new Response(v))
		return this
	}
}

class Elem {
	constructor() { this.listeners = {} }

	class(c, b) {
		if (b) this.elem.classList.add(c)
		else this.elem.classList.remove(c)
		return this
	}

	emit(k, v) {
		if (k in this.listeners)
			for (const f of this.listeners[k])
				f(v)
		return this
	}

	on(k, f) {
		if (!(k in this.listeners))
			this.listeners[k] = []
		this.listeners[k].push(f)
		return this
	}
}

class App extends Elem {
	constructor(cache) {
		super()
		this.elem = document.body
		this.sections = {
			input: new Input().on('file', x => this.onFile(x)),
			edit: new Edit()
				.on('text', x => this.onText(x))
				.on('imageClicked', () => document.documentElement.requestFullscreen())
				.on('clearClicked', () => this.clearImage())
		}
		this.goto('input')
		this.cache = cache
		this.sections.edit.text(localStorage.getItem('caption'))
		this.cache.get('pic').then(x => { if (x) this.onFile(x) })
	}

	goto(x) {
		for (const [k, v] of Object.entries(this.sections))
			v.class('hide', k !== x)
		return this
	}

	onFile(x) {
		this.cache.set('pic', x)
		this.sections.edit.image(x)
		this.goto('edit')
	}

	onText(x) {
		localStorage.setItem('caption', x)
	}

	clearImage() {
		this.sections.edit.image('')
		this.goto('input')
	}
}

class Input extends Elem {
	constructor() {
		super()
		this.elem = $('#input')
		this.input = $('#input input[type="file"]')
		this.input.onchange = async () => {
			const file = await read_file(this.input.files[0])
			this.emit('file', file)
		}
	}
}

class Edit extends Elem {
	constructor() {
		super()
		this.elem = $('#edit')
		this.textarea = $('#edit textarea')
		this.textarea.onblur = () => this.emit('text', this.textarea.value)
		this.img = $('#edit img')
		this.img.onclick = (e) => this.emit('imageClicked', e)
		this.clear = $('#edit #clear')
		this.clear.onclick = x => this.emit('clearClicked', x)
	}

	text(x) {
		this.textarea.value = x
		return this
	}

	image(x) {
		this.img.src = x
		return this
	}
}

window.onload = async () => {
	const cache = await caches.open(CACHE_NAME)
	new App(new B64Storage(cache))
}
