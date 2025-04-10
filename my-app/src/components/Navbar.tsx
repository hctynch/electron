import GlassBox from "./GlassBox"

function Navbar() {
  return (
    <div className='min-w-60 max-w-60 my-6 ml-4'>
        <GlassBox className="p-2 border-white/30 border shadow shadow-white/70 w-full h-full flex flex-col gap-4">
            <a href='#/'>
                <div className='border-b pb-1 border-gray-300'>
                    <p className='text-start text-2xl font-semibold text-white'>trackhounds</p>
                </div>
            </a>
        </GlassBox>
    </div>
  )
}

export default Navbar