import { type Accessor, type Setter, createSignal, createEffect } from 'solid-js'
import { IStorage } from './B64Storage'
import { read_file } from '../util/files'

export class State {
	cache_storage: IStorage
	local_storage: Storage
	image: Accessor<string|undefined>
	setImage: Setter<string|undefined>
	text: Accessor<string>
	setText: Setter<string>

	constructor(cache_storage: IStorage, local_storage: Storage) {
		this.cache_storage = cache_storage
		this.local_storage = local_storage

		const [image, setImage] = createSignal<undefined|string>(undefined)
		this.image = image
		this.setImage = setImage

		const [text, setText] = createSignal<string>('')
		this.text = text
		this.setText = setText

		createEffect(this.onTextUpdate.bind(this))
		createEffect(this.onImageUpdate.bind(this))
	}

	readImageFromFile(x: File|undefined) {
		if (x === undefined)
			this.setImage(undefined)
		else
			read_file(x).then(x => this.setImage(x))
	}

	async init() {
		this.setText(localStorage.getItem('caption') || '')
		this.setImage(await this.cache_storage.get('pic'))
	}

	onTextUpdate() {
		const text = this.text()
		if (text.length === 0)
			return
		else
			this.local_storage.setItem('caption', text)
	}

	onImageUpdate() {
		const image = this.image()
		if (image)
			this.cache_storage.set('pic', image)
	}
}
