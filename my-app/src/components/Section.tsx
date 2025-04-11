
interface SectionProps {
    children: React.ReactNode;
}

function Section({children}: SectionProps) {
  return (
      <div className='flex items-center justify-center h-full w-full py-6 pr-6'>
          {children}
      </div>
  )
}

export default Section