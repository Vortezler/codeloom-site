import { Suspense, lazy, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import Curriculum from './pages/Curriculum'
import CurriculumUnit from './pages/CurriculumUnit'

// Code-split: Practice pulls in CodeMirror and only loads when a member
// actually visits it, keeping the initial load light on school wifi.
const Practice = lazy(() => import('./pages/Practice'))

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <NavBar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum/:unitId" element={<CurriculumUnit />} />
          <Route
            path="/practice"
            element={
              <Suspense fallback={<p className="text-text-muted">Loading practice problems…</p>}>
                <Practice />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
