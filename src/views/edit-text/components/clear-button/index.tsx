import { EventHandler } from '@/functions'
import './index.sass'

export function ClearButton(props: { onClick: EventHandler<MouseEvent> }) {
	return <button id='clear' onclick={props.onClick}>×</button>
}
