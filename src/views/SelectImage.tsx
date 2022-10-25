export type Props = {
	onFile: (x: File|undefined) => void;
}

export default function SelectImage({ onFile }: Props) {
	const onChange = (x: Event) => {
		const target = x.target as HTMLInputElement
		if (target && target.files && target.files.length)
			onFile(target.files[0])
		else
			onFile(undefined)
	}

	return (
		<section id='select-image'>
			<input type='file' accept='image/*' onChange={onChange}/>
		</section>
	)
}
