import GlassBox from "./GlassBox"
import Section from "./Section"

function Home() {
    return (
        <Section>
          {/* Colorful Glass Box */}
          <GlassBox className="p-6 border-white border shadow shadow-white/70 rounded-r-xl">
            <p className="text-white text-2xl font-medium">Custom Colored Glass</p>
          </GlassBox>
        </Section>
      )
}

export default Home