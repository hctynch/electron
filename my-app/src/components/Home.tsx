import GlassBox from "./GlassBox"

function Home() {
    return (
        <div className="flex items-center justify-center h-full w-full p-6">
          
          {/* Colorful Glass Box */}
          <GlassBox className="p-6 border-white/30 border shadow shadow-white/70 w-full h-full">
            <p className="text-white text-2xl font-medium">Custom Colored Glass</p>
          </GlassBox>
        </div>
      )
}

export default Home