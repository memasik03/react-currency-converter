import { createContext, useState } from 'react'

export const CurrenciesContext = createContext({
	currencies: [],
	setCurrencies: null,
})

export function CurrenciesProvider({ children }) {
	const [currencies, setCurrencies] = useState([])

	return (
		<CurrenciesContext.Provider
			value={{
				currencies,
				setCurrencies,
			}}
		>
			{children}
		</CurrenciesContext.Provider>
	)
}
