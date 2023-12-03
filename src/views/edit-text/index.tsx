import type { EventHandler } from '@/functions'
import './index.sass'
import { ClearButton } from './components/clear-button'

export function EditText(props: {
	image: string
	text: string
	onUpdateText: EventHandler<string>
	onImageClick: EventHandler<MouseEvent>
	onClearClick: EventHandler<MouseEvent>
}) {
	function onTextChange(e: Event) {
		if (e.target instanceof HTMLTextAreaElement)
			props.onUpdateText(e.target.value)
	}

	return <section id='edit-text'>
		<img id='image' src={props.image} onclick={props.onImageClick}/>
		<textarea id='editor' onchange={onTextChange}>{props.text}</textarea>
		<ClearButton onClick={props.onClearClick}/>
	</section>
}
