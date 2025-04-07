import './App.css'
import GlassBox from './components/GlassBox'

function App() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col gap-6 items-center justify-center">
      
      {/* Simple Glass Box */}
      <GlassBox className="p-6 border border-white/25 shadow-lg">
        <p className="text-white text-lg font-medium">Basic Glass Effect</p>
      </GlassBox>
      
      {/* Card-style Glass Box */}
      <GlassBox className="p-8 border border-white/30 shadow-xl max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Glass Card</h2>
        <p className="text-white/90">
          This card demonstrates the frosted glass effect using Tailwind CSS.
          The backdrop-blur creates the glass-like transparency while maintaining readability.
        </p>
        <button className="mt-4 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-md transition-colors">
          Learn More
        </button>
      </GlassBox>
      
      {/* Colorful Glass Box */}
      <GlassBox className="p-6 border-2 border-pink-300/50 bg-pink-400/20 shadow-lg shadow-pink-500/20">
        <p className="text-white text-lg font-semibold">Custom Colored Glass</p>
      </GlassBox>
      
    </div>
  )
}

export default App
