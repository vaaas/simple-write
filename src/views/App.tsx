import './App.sass'
import type B64Storage from '../B64Storage'
import SelectImage from './SelectImage'
import EditText from './EditText'
import { Accessor, createEffect, createSignal, Match, onMount, Switch } from 'solid-js'

export type Props = {
	cache: B64Storage;
}

const read_file = (x: File): Promise<string> => new Promise(yes => {
	const reader = new FileReader()
	reader.onload = () => yes(reader.result as string)
	reader.readAsDataURL(x)
})

export default function App({ cache }: Props) {
	const [image, setImage] = createSignal<undefined|string>(undefined);
	const [text, setText] = createSignal<string>('');

	const changeImage = async (x: File|undefined) => {
		if (x === undefined)
			setImage(undefined)
		else
			setImage(await read_file(x));
	}

	createEffect(() => {
		const img = image()
		if (img) cache.set('pic', img)
	})

	onMount(async () => {
		setImage(await cache.get('pic'))
	})

	const goFullscreen = () => {
		document.documentElement.requestFullscreen()
	}

	return <Switch>
		<Match when={image() !== undefined}>
			<EditText
				image={image as Accessor<string>}
				text={text}
				updateText={(x) => setText(x)}
				imageClicked={goFullscreen}
				clearClicked={() => setImage(undefined)}
			/>
		</Match>
		<Match when={image() === undefined}>
			<SelectImage onFile={changeImage}/>
		</Match>
	</Switch>
}
