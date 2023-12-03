import './App.sass'
import { Match, Switch } from 'solid-js'
import { EditText, SelectImage } from './views'
import { goFullscreen } from './dom'
import { State } from './state'

export default function App({ state }: { state: State }) {
	return <Switch>
		<Match when={state.image() !== undefined}>
			<EditText
				image={state.image()!}
				text={state.text()}
				onUpdateText={state.setText}
				onImageClick={goFullscreen}
				onClearClick={() => state.setImage(undefined)}
			/>
		</Match>

		<Match when={state.image() === undefined}>
			<SelectImage onFile={state.readImageFromFile}/>
		</Match>
	</Switch>
}
