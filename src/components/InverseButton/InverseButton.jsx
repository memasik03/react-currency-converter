import { ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
	height: 100%;
	background-color: transparent;
	display: flex;
	align-items: center;
	transition: 0.2s;
	svg {
		color: var(--color);
	}
`

export function InverseButton({ onClick }) {
	const [isInversed, setIsInversed] = useState()

	function inverse() {
		setIsInversed(!isInversed)
		onClick()
	}

	return (
		<Button onClick={inverse} style={{ transform: isInversed && 'scaleX(-1)' }}>
			<ArrowLeftRight size={27} />
		</Button>
	)
}
