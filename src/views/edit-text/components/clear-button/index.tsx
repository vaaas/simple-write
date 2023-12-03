import { EventHandler } from '@/util/functions'
import './index.sass'

export function ClearButton(props: { onClick: EventHandler<MouseEvent> }) {
	return <button id='clear' class='absolute' onclick={props.onClick}>×</button>
}
