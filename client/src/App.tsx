import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthPage } from './components/AuthPage'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthPage />
    </QueryClientProvider>
  )
}

export default App
