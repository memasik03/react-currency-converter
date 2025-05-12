import styled from 'styled-components'
import { CurrencyDropdown } from '../CurrencyDropdown/CurrencyDropdown'
import { ValueInput } from '../ValueInput/ValueInput'

const Input = styled.div`
	width: 100%;
`

export function CurrencyInput({
	id,
	info,
	selectCurrency,
	openDropdown,
	setInputValue,
}) {
	return (
		<Input>
			<CurrencyDropdown
				selectedCurrency={info.selectedCurrencies[id]}
				selectCurrency={name => selectCurrency(name, id)}
				isOpened={info.openedDropdown === id}
				openDropdown={() => openDropdown(id)}
			/>
			<ValueInput
				value={info.inputsValues[id]}
				setValue={value => setInputValue(value, id)}
			/>
		</Input>
	)
}
