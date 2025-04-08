import GlassBox from './GlassBox'

const About = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-600 to-blue-500">
      <GlassBox className="p-8 border border-white/30 shadow-xl max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-4">About</h1>
        <div className="text-white/90">
          <p className="mb-4">Welcome to our Electron application!</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
          <p className="mb-4">Our mission is to create beautiful and functional applications using modern web technologies.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-2">Technologies</h2>
          <p className="mb-4">This application is built with Electron, React, TypeScript, and Tailwind CSS.</p>
          
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

export default About