import type { EventHandler } from '@/util/functions'

export function SelectImage(props: { onFile: EventHandler<File|undefined> }) {
	function onChange(x: Event) {
		const target = x.target
		if (target instanceof HTMLInputElement && target.files && target.files.length)
			props.onFile(target.files[0])
		else
			props.onFile(undefined)
	}

	return <section id='select-image'>
		<input type='file' accept='image/*' onChange={onChange}/>
	</section>
}
