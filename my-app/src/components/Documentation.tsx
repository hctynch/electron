import GlassBox from './GlassBox'

const Documentation = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-600 to-purple-500">
      <GlassBox className="p-8 border border-white/30 shadow-xl max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">Documentation</h1>
        <div className="text-white/90">
          <p className="mb-4">Welcome to the documentation page!</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">Getting Started</h2>
          <p className="mb-4">This section provides information about how to get started with our application.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">Advanced Features</h2>
          <p className="mb-4">Learn about the advanced features available in our application.</p>
          
          <button 
            className="mt-6 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-md transition-colors"
            onClick={() => window.history.back()}
          >
            Back to Home
          </button>
        </div>
      </GlassBox>
    </div>
  )
}

export default Documentation