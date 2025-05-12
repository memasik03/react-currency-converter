import { useContext, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import skins from '../../assets/skins.json'
import { CurrenciesContext } from '../../contexts/CurrenciesContext.jsx'
import { Converter } from '../Converter/Converter'

const activeSkin = 'arab'

const GlobalVars = createGlobalStyle`
  :root {
		--bg-color: ${skins[activeSkin]['background-color']};
		--color: ${skins[activeSkin]['color']};
		--main-color: ${skins[activeSkin]['main-color']};
		--sc-color: ${skins[activeSkin]['second-color']}
  }
	`
const Container = styled.div`
	background-color: var(--bg-color);
	width: 100%;
	height: 100vh;
	padding: 100px 20px;
	font-family: 'Quicksand';
	font-size: 18px;
	color: var(--color);
`

function App() {
	const { setCurrencies } = useContext(CurrenciesContext)

	async function GetCurrencies() {
		const url =
			'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
		const response = await fetch(url)
		try {
			if (!response.ok) {
				throw new Error('Resoinse error: ', response.ok)
			}
			const data = await response.json()
			return data
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		async function fetchData() {
			const data = await GetCurrencies()
			setCurrencies(data)
		}
		fetchData()
	}, [setCurrencies])

	return (
		<>
			<GlobalVars />
			<Container>
				<Converter />
			</Container>
		</>
	)
}

export default App
