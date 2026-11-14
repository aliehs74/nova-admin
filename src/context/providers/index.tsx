import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import store from '@/redux'
import theme from '@/shared/theme'

const Providers = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)

export default Providers
