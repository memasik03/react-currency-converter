import { useContext } from 'react'
import styled from 'styled-components'
import { CurrenciesContext } from '../../contexts/CurrenciesContext'

const DropdownBox = styled.div`
	width: 100%;
	position: relative;
`

const DropdownButton = styled.button`
	width: 100%;
	height: 40px;
	color: var(--color);
	background-color: var(--sc-color);
	border-radius: 15px 15px 0 0;
	font-size: 18px;
	font-family: 'Raleway';
`

const Dropdown = styled.ul`
	transition: 0.5s;
	position: absolute;
	display: block;
	flex-direction: column;
	gap: 10px;
	width: 100%;
	background-color: var(--sc-color);
	padding: 10px;
	z-index: 100;
	border-radius: 0 0 15px 15px;
	max-height: 500px;
	height: 500px;
	animation: fadeIn 0.3s forwards;
	overflow: scroll;

	@keyframes fadeIn {
		from {
			max-height: 0;
			padding: 0px;
		}
		to {
			max-height: 500;
			padding: 10px;
		}
	}
`

const DropdownElement = styled.li`
	margin-bottom: 5px;
	width: 100%;
`
const ElementButton = styled.button`
	font-family: 'Raleway';
	font-weight: 500;
	height: 40px;
	width: 100%;
	border-radius: 15px;
	background-color: var(--main-color);
	border: solid 2px rgba(255, 255, 255, 0.4);

	font-family: 'Raleway';
	font-size: 18px;
	color: var(--color);
`

export function CurrencyDropdown({
	selectedCurrency,
	selectCurrency,
	isOpened,
	openDropdown,
}) {
	const { currencies } = useContext(CurrenciesContext)
	return (
		<DropdownBox>
			<DropdownButton
				onClick={e => {
					e.stopPropagation()
					openDropdown()
				}}
			>
				{selectedCurrency}
			</DropdownButton>
			{isOpened && (
				<Dropdown>
					{currencies.map(currency => (
						<DropdownElement key={currency.cc}>
							<ElementButton onClick={() => selectCurrency(currency.cc)}>
								{currency.cc}
							</ElementButton>
						</DropdownElement>
					))}
				</Dropdown>
			)}
		</DropdownBox>
	)
}
