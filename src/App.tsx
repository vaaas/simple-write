import './App.sass'
import './utility.sass'
import { Match, Switch } from 'solid-js'
import { EditText, SelectImage } from './views'
import { goFullscreen } from './util/dom'
import { State } from './data-access/state'

export default function App({ state }: { state: State }) {
	return <main id='app' class='flex full centered'>
		<Switch>
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
	</main>
}
