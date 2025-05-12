import styled from 'styled-components'

const Input = styled.input`
	width: 100%;
	height: 40px;
	background-color: var(--sc-color);
	border-radius: 0 0 15px 15px;
	font-family: 'Raleway';
	color: var(--color);
	font-size: 18px;
	padding: 15px;
	text-align: center;
`

export function ValueInput({ value, setValue }) {
	return (
		<Input
			type='number'
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	)
}
