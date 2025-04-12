import {
  FaBan,
  FaChartBar,
  FaClipboardList,
  FaDog,
  FaDownload,
  FaGavel,
  FaHome
} from "react-icons/fa";
import { FaPaw } from "react-icons/fa6";
import GlassBox from "./GlassBox";

function Navbar() {
  return (
    <div className='min-w-70 max-w-70 my-6 ml-4'>
        <GlassBox className="p-2 border-white border shadow shadow-white/70 w-full h-full flex flex-col gap-2 rounded-l-xl overflow-auto">
          <a href='#/' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center justify-center gap-2 hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white'>
                <FaPaw className="text-white text-2xl" />
                <p className='text-center text-3xl font-medium text-white py-1'>trackhounds</p>
              </div>
              <div className='w-11/12 bg-white h-0.5 mx-auto mt-2'/>
            </div>
          </a>
          
          <a href='#/' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaHome className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Home</p>
              </div>
            </div>
          </a>
          
          <a href='#/dogs' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaDog className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Dogs</p>
              </div>
            </div>
          </a>
          
          <a href='#/judges' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaGavel className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Judges</p>
              </div>
            </div>
          </a>
          
          <a href='#/scores' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaClipboardList className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Scores</p>
              </div>
            </div>
          </a>
          
          <a href='#/scratches' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaBan className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Scratches</p>
              </div>
            </div>
          </a>
          
          <a href='#/reports' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaChartBar className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Reports</p>
              </div>
            </div>
          </a>
          
          {/* Add Update navigation item */}
          <a href='#/update' className=''>
            <div className='w-full flex flex-col'>
              <div className='flex items-center gap-3 text-white hover:bg-gray-600/40 rounded-2xl hover:border-1 border-white p-1'>
                <FaDownload className="ml-2 text-xl" />
                <p className='text-start text-xl font-normal'>Update</p>
              </div>
            </div>
          </a>
        </GlassBox>
    </div>
  )
}

export default Navbar