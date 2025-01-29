import Sidebar from "./components/Sidebar"
import './App.css'
import TopBar from "./components/TopBar"
import ProjectContent from "./components/ProjectContent"
import { SearchProvider } from "./contexts/SearchContext"

function App() {

  return (
    <SearchProvider>
      <div className="bg-gray-900 text-white">
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <TopBar />
            <ProjectContent />
          </main>
        </div>
      </div>
    </SearchProvider>
  )
}

export default App
