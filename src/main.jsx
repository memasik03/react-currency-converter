import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'
import { CurrenciesProvider } from './contexts/CurrenciesContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<CurrenciesProvider>
			<App />
		</CurrenciesProvider>
	</StrictMode>
)
