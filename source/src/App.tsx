import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Credentials from './pages/Credentials'
import NurseSimulation from './pages/NurseSimulation'
import MarketIntelligence from './pages/MarketIntelligence'
import GovernanceCharter from './pages/GovernanceCharter'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route path="/credentials" element={<Credentials />} />
      <Route path="/nurse-simulation" element={<NurseSimulation />} />
      <Route path="/market-intelligence" element={<MarketIntelligence />} />
      <Route path="/governance-charter" element={<GovernanceCharter />} />
    </Routes>
  )
}
