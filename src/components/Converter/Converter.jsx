import { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CurrenciesContext } from '../../contexts/CurrenciesContext'
import { CurrencyInput } from '../CurrencyInput/CurrencyInput'
import { InverseButton } from '../InverseButton/InverseButton'

const ConverterBox = styled.div`
	max-width: 720px;
	padding: 20px;
	border-radius: 20px;
	background-color: var(--main-color);
	margin: 0 auto;
	border: solid 2px rgba(255, 255, 255, 0.5);
`
const Title = styled.h1`
	font-size: 26px;
	font-weight: 700;
	font-family: 'Playfair Display SC';
`

const ConverterForm = styled.div`
	display: flex;
	margin-top: 20px;
	height: auto;
	gap: 10px;
	align-items: center;
	height: 80px;
`

export function Converter() {
	const [info, setInfo] = useState({
		selectedCurrencies: ['USD', 'EUR'],
		inputsValues: [860, 0],
		openedDropdown: null,
		selectedCurrenciesInfo: [],
		lastChanged: 0,
	})

	const { currencies } = useContext(CurrenciesContext)

	function selectCurrency(id, currencyName) {
		setInfo(prev => ({
			...prev,
			selectedCurrencies: prev.selectedCurrencies.map((currency, index) =>
				index === id ? currencyName : currency
			),
			lastChanged: id,
		}))
	}

	function openDropdown(id) {
		if (id === -1 || info.openedDropdown === id) {
			setInfo(prev => ({
				...prev,
				openedDropdown: -1,
			}))
		} else {
			setInfo(prev => ({
				...prev,
				openedDropdown: id,
			}))
		}
	}

	function setInputValue(id, value, isSetLastChanged = true) {
		setInfo(prev => ({
			...prev,
			inputsValues: prev.inputsValues.map((inputValue, index) =>
				index === id ? value : inputValue
			),
			lastChanged: isSetLastChanged ? id : prev.lastChanged,
		}))
	}

	function inverseCurrencies() {
		setInfo(prev => {
			return {
				...prev,
				selectedCurrencies: [
					prev.selectedCurrencies[1],
					prev.selectedCurrencies[0],
				],
				inputsValues: [prev.inputsValues[1], prev.inputsValues[0]],
				lastChanged: prev.lastChanged === 0 ? 1 : 0,
			}
		})
	}

	const setCurrenciesInfo = useCallback(() => {
		setInfo(prev => ({
			...prev,
			selectedCurrenciesInfo:
				info.selectedCurrencies[0] === info.selectedCurrencies[1]
					? Array(2).fill(prev.selectedCurrenciesInfo[0])
					: currencies.filter(c => info.selectedCurrencies.includes(c.cc)),
		}))
	}, [info.selectedCurrencies, currencies])

	useEffect(() => {
		setCurrenciesInfo()
	}, [info.selectedCurrencies, currencies, setCurrenciesInfo])

	useEffect(() => {
		if (info.selectedCurrenciesInfo.length === 1) {
			setInfo(prev => ({
				...prev,
				selectedCurrenciesInfo: Array(2).fill(prev.selectedCurrenciesInfo[0]),
			}))
		}
	}, [info.selectedCurrenciesInfo])

	useEffect(() => {
		const handleClick = () => openDropdown(-1)
		document.addEventListener('click', handleClick)
		return () => document.removeEventListener('click', handleClick)
	})

	useEffect(() => {
		if (!info.selectedCurrenciesInfo.length) return
		const lastChanged = info.lastChanged === 0 ? 1 : 0
		const firstCurrencyRate =
			info.selectedCurrenciesInfo[info.lastChanged === 0 ? 0 : 1].rate
		const secondCurrencyRate = info.selectedCurrenciesInfo[lastChanged].rate
		const result = (
			(firstCurrencyRate / secondCurrencyRate) *
			info.inputsValues[info.lastChanged]
		).toFixed(3)

		if (result === info.inputsValues[lastChanged]) return
		setInputValue(info.lastChanged === 0 ? 1 : 0, result, false)
	}, [info.lastChanged, info.selectedCurrenciesInfo, info.inputsValues])

	return (
		<ConverterBox>
			<Title>Welcome to currency converter!</Title>
			<ConverterForm>
				<CurrencyInput
					id={0}
					info={info}
					selectCurrency={(name, id) => selectCurrency(id, name)}
					openDropdown={openDropdown}
					setInputValue={(value, id) => setInputValue(id, value)}
				/>
				<InverseButton onClick={inverseCurrencies} />
				<CurrencyInput
					id={1}
					info={info}
					selectCurrency={(name, id) => selectCurrency(id, name)}
					openDropdown={openDropdown}
					setInputValue={(value, id) => setInputValue(id, value)}
				/>
			</ConverterForm>
		</ConverterBox>
	)
}
