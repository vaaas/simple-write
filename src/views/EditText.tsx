import './EditText.sass'

import { Accessor } from 'solid-js';

export type Props = {
	image: Accessor<string>;
	imageClicked: (e: MouseEvent) => void;
	clearClicked: (e: MouseEvent) => void;
	text: Accessor<string>;
	updateText: (e: string) => void;
}

export default function EditText({
	image,
	imageClicked,
	clearClicked,
	updateText,
	text
}: Props) {
	const textChanged = (e: Event) => {
		updateText((e.target as HTMLTextAreaElement).value)
	}

	return <section id='edit-text'>
		<img src={image()} onclick={imageClicked}/>

		<textarea onchange={textChanged}>
			{text()}
		</textarea>

		<button id='clear' onclick={clearClicked}>×</button>
	</section>
}
