import { FaCode, FaEnvelope, FaGithub, FaSearchDollar, FaTools } from 'react-icons/fa'
import Back from './Back'
import GlassBox from './GlassBox'
import Section from './Section'

const About = () => {
  return (
    <Section>
      <GlassBox className="p-8 border rounded-r-2xl overflow-y-auto">
        <div className="flex flex-col">
          <div className="flex items-center w-full mb-6">
            <Back />
            <h1 className="text-white text-center w-full text-4xl font-bold">About TrackHounds</h1>
          </div>

          <div className="text-white/90 space-y-6">
            {/* Overview */}
            <div>
              <p className="text-xl mb-4">
                TrackHounds is a modern scoring application designed to provide an alternative 
                to outdated scoring software currently used in Master's Foxhunts. It allows users 
                to efficiently manage hunts, track scores, and generate reports.
              </p>
              <p className="text-md text-white/80 italic">Developed by Hunt Tynch</p>
            </div>
            
            {/* Technologies */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaTools className="text-blue-400" />
                <h2 className="text-2xl font-semibold text-blue-400">Technologies</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Technology name="Docker" color="#2496ED" />
                <Technology name="Electron" color="#47848F" />
                <Technology name="React" color="#61DAFB" />
                <Technology name="Spring Boot" color="#6DB33F" />
                <Technology name="MariaDB" color="#003545" />
                <Technology name="GitHub Actions" color="#2088FF" />
                <Technology name="JavaScript" color="#F7DF1E" />
                <Technology name="Vite" color="#646CFF" />
                <Technology name="Tailwind CSS" color="#06B6D4" />
                <Technology name="TypeScript" color="#3178C6" />
                <Technology name="Axios" color="#5A29E4" />
              </div>
            </div>
            
            {/* Features */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaSearchDollar className="text-green-400" />
                <h2 className="text-2xl font-semibold text-green-400">Features</h2>
              </div>
              <ul className="text-start list-disc list-inside space-y-1">
                <li>Complete hunt management system</li>
                <li>Dog registration and tracking</li>
                <li>Judge management</li>
                <li>Score entry and tracking</li>
                <li>Scratch sheet management</li>
                <li>Comprehensive reporting</li>
                <li>Automatic updates</li>
              </ul>
            </div>
            
            {/* Contact & Resources */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaCode className="text-purple-400" />
                <h2 className="text-2xl font-semibold text-purple-400">Resources</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaGithub className="text-white/70" />
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('https://github.com/hctynch/trackhounds', '_blank');
                    }}
                    className="text-blue-300 hover:text-blue-400 hover:underline"
                  >
                    GitHub Repository
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-white/70" />
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('mailto:tynchhunt@gmail.com', '_blank');
                    }}
                    className="text-blue-300 hover:text-blue-400 hover:underline"
                  >
                    Contact: tynchhunt@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Version */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/60">
                TrackHounds © {new Date().getFullYear()} | Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      </GlassBox>
    </Section>
  )
}

// Technology badge component
const Technology = ({ name, color }) => (
  <div 
    className="px-3 py-1.5 rounded-md text-white font-medium text-sm"
    style={{ backgroundColor: `${color}30`, border: `1px solid ${color}70` }}
  >
    {name}
  </div>
)

export default About