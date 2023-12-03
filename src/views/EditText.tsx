import { EventHandler } from '../functions'
import './EditText.sass'

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
		<img src={props.image} onclick={props.onImageClick}/>
		<textarea onchange={onTextChange}>{props.text}</textarea>
		<button id='clear' onclick={props.onClearClick}>×</button>
	</section>
}
