import './App.css'
import { FlowBuilder } from './components/FlowBuilder'

function App() {
  return (
    <div className="h-screen w-screen">
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Chatbot Flow Builder</h1>
      </header>
      <main className="h-[calc(100vh-4rem)]">
        <FlowBuilder />
      </main>
    </div>
  )
}

export default App
