import { FaArrowLeftLong } from "react-icons/fa6"

function Back() {
  return (
    <button 
        className="flex justify-center items-center bg-white/30 hover:bg-white/40 hover:border-white hover:border text-white rounded-full p-2 max-h-[calc(2rem+0.5rem)] max-w-[calc(2rem+0.5rem)]"
        onClick={() => window.history.back()}
    >
        <FaArrowLeftLong className="h-8 w-8" />
    </button>
  )
}

export default Back