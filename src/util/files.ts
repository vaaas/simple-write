export const read_file = (x: File): Promise<string> => new Promise(yes => {
	const reader = new FileReader()
	reader.onload = () => yes(reader.result as string)
	reader.readAsDataURL(x)
})
