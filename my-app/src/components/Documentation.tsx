import { useState } from 'react'
import {
  FaBan,
  FaBook,
  FaBug,
  FaChartLine,
  FaClipboardList,
  FaDog,
  FaDownload,
  FaGavel,
  FaHome,
  FaQuestionCircle,
  FaServer
} from 'react-icons/fa'
import Back from './Back'
import GlassBox from './GlassBox'
import Section from './Section'

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <GlassBox className="p-8 border rounded-r-2xl">
        <div className="flex flex-col max-h-full overflow-y-auto">
          <div className="flex items-center mb-6">
            <Back />
            <h1 className="text-white text-4xl font-bold text-center w-full">Trackhounds Documentation</h1>
          </div>
          
          {/* Table of Contents */}
          <div className="mb-8 p-4 bg-white/10 rounded-lg">
            <h2 className="text-xl text-white font-semibold mb-3">Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { id: 'overview', title: 'Overview', icon: <FaBook /> },
                { id: 'requirements', title: 'Requirements', icon: <FaServer /> },
                { id: 'installation', title: 'Installation', icon: <FaDownload /> },
                { id: 'application', title: 'Application Guide', icon: <FaHome /> },
                { id: 'troubleshooting', title: 'Troubleshooting', icon: <FaBug /> },
                { id: 'help', title: 'Getting Help', icon: <FaQuestionCircle /> }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 text-left p-2 rounded transition ${
                    activeSection === section.id ? 'bg-white/30 text-white' : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Overview Section */}
          <section id="overview" className="mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaBook className="text-blue-300" />
              <h2 className="text-2xl font-bold text-white">Overview</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <p>
                TrackHounds is a modern scoring application designed to provide an alternative 
                to outdated scoring software currently used in Master's Foxhunts. It allows users 
                to efficiently manage hunts, track scores, and generate reports.
              </p>
              <p>
                The application offers a complete hunt management system with features for dog 
                registration, judge management, score tracking, and comprehensive reporting.
              </p>
            </div>
          </section>
          
          {/* Requirements Section */}
          <section id="requirements" className="mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaServer className="text-green-300" />
              <h2 className="text-2xl font-bold text-white">Required Resources</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Docker</h3>
                <p>Docker is required to run the TrackHounds application.</p>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.docker.com/get-started/', '_blank');
                  }}
                  className="text-blue-300 hover:underline mt-2 inline-block"
                >
                  Download Docker
                </a>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">TrackHounds Installer</h3>
                <p>Download the latest version of TrackHounds from the GitHub Releases page.</p>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://github.com/hctynch/trackhounds/releases/latest', '_blank');
                  }}
                  className="text-blue-300 hover:underline mt-2 inline-block"
                >
                  Latest Release
                </a>
                <div className="mt-2 text-white/70 text-sm">
                  <p>Automatic updates are enabled when connected to the internet.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Installation Section */}
          <section id="installation" className="mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaDownload className="text-purple-300" />
              <h2 className="text-2xl font-bold text-white">Installation Guide</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-xl">1. Download the Installer</h3>
                  <p className="mb-2">Go to the latest release page on GitHub and follow the Download Instructions.</p>
                  <p className="text-white/70">Download the correct installer under Assets section.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-xl">2. Run the Installer</h3>
                  <p className="mb-2">Run the downloaded installer to install TrackHounds.</p>
                  <div className="bg-yellow-500/20 border border-yellow-500/40 p-3 rounded-md">
                    <p className="text-white">
                      <strong>Note:</strong> The installer may show as "untrusted" - click "More Info" and "Run anyway".
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-xl">3. Application Start/Stop</h3>
                  <p className="mb-2">Close TrackHounds when finished to shutdown the docker container.</p>
                  <p className="text-white/70">Clicking on the TrackHounds application will start everything back up.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Application Guide Section */}
          <section id="application" className="mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaHome className="text-orange-300" />
              <h2 className="text-2xl font-bold text-white">Application Guide</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <p>TrackHounds provides a comprehensive interface for managing all aspects of a hunt:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FeatureCard 
                  title="Home" 
                  icon={<FaHome />} 
                  description="Overview of the current hunt. Use the menu to create new hunts or edit existing ones."
                />
                
                <FeatureCard 
                  title="Dogs" 
                  icon={<FaDog />} 
                  description="View all registered dogs and add new dogs to the hunt."
                />
                
                <FeatureCard 
                  title="Judges" 
                  icon={<FaGavel />} 
                  description="Manage judges for the hunt: view current judges, add or edit judges."
                />
                
                <FeatureCard 
                  title="Score Entry" 
                  icon={<FaClipboardList />} 
                  description="Add scores for dogs and view/delete entered scores."
                />
                
                <FeatureCard 
                  title="Scratch Sheet" 
                  icon={<FaBan />} 
                  description="View and manage scratches. Add new scratches and view all entered scratches."
                />
                
                <FeatureCard 
                  title="Reports" 
                  icon={<FaChartLine />} 
                  description="Generate printable reports including overall and daily speed & drive reports."
                />
              </div>
              
              <div className="bg-blue-500/20 border border-blue-500/40 p-3 rounded-md mt-4">
                <p className="text-white">
                  <strong>Note:</strong> For the best printing experience with reports, use Google Chrome.
                </p>
              </div>
            </div>
          </section>
          
          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-8">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaBug className="text-red-300" />
              <h2 className="text-2xl font-bold text-white">Troubleshooting</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Docker Desktop Service Not Starting</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Press <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Win</kbd> + <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">R</kbd> to open the Run dialog.</li>
                  <li>Type <code className="bg-gray-700 px-2 py-1 rounded">services.msc</code> and click OK.</li>
                  <li>Scroll down to Docker Desktop Service.</li>
                  <li>Right-click and select Start.</li>
                </ol>
                <div className="mt-2">
                  <p className="font-semibold">Optional: Set service to start automatically</p>
                  <ul className="list-disc list-inside pl-2">
                    <li>Right-click Docker Desktop Service &gt; Properties.</li>
                    <li>Set Startup Type to Automatic.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Help Section */}
          <section id="help" className="mb-4">
            <div className="flex items-center gap-2 mb-4 border-b border-white/20 pb-2">
              <FaQuestionCircle className="text-yellow-300" />
              <h2 className="text-2xl font-bold text-white">Getting Help</h2>
            </div>
            <div className="text-white/90 space-y-4">
              <p>If you encounter issues or have feature requests:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Request a Live Demo</h3>
                  <p className="mb-1">Email at <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('mailto:tynchhunt@gmail.com', '_blank');
                    }}
                    className="text-blue-300 hover:underline"
                  >tynchhunt@gmail.com</a> to request a demo of the TrackHounds website.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Report Issues or Request Features</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to the <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.open('https://github.com/hctynch/trackhounds/issues', '_blank');
                      }}
                      className="text-blue-300 hover:underline"
                    >Issues</a> tab on GitHub.</li>
                    <li>Click New Issue in the top right.</li>
                    <li>Select the appropriate template (Feature Request, Bug Report).</li>
                    <li>Fill in the template and click Create.</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>
      </GlassBox>
    </Section>
  )
}
interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const FeatureCard = ({ title, icon, description }: FeatureCardProps) => (
  <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:border-white/40 transition">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-white/90">{icon}</span>
      <h3 className="text-white font-semibold">{title}</h3>
    </div>
    <p className="text-white/80 text-sm">{description}</p>
  </div>
);

export default Documentation