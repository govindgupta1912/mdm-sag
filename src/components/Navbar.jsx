
import React, { useState } from 'react'
import mdm from '../assets/mdm.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
 
   const [menuOpen,setMenuOpen]=useState(false);
   
  return (
    <nav className="bg-[#03A9FC] p-4 shadow-md">
      <div className='flex items-center justify-between'>
    <div className="flex items-center space-x-2">
      <img src={mdm} alt="Logo" className="h-7 w-7" />
      <span className="text-white font-bold text-lg">mobiHEAL MDM</span>
    </div>

       <div className='md:hidden'>
        <button
        onClick={()=>(setMenuOpen(!menuOpen))}
        className='text-white text-2xl focus:outline-none'
        >
          {menuOpen ? '✖' : '☰'}
        </button>
       </div>

    <div className=" hidden md:flex space-x-4">
      <Link to={'/'} className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
        Fetch Device Info
      </Link>
      <Link to={'/enroll'} className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
        Enroll Device
      </Link>
      <Link className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
        Manage Device
      </Link>
      <Link className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
        Manage Policy
      </Link>
    </div>

    </div>

    {
      menuOpen&&(
        <div className='flex flex-col space-y-2 md:hidden mt-4'>
          <button className='border border-white text-white px-1 py-1 text-sm rounded-md font-normal hover:text-black hover:bg-white '>
          Fetch Device Info
          </button>
          <button className='border border-white text-white px-1 py-1 text-sm rounded-md font-normal hover:text-black hover:bg-white '>
          Enroll Device
          </button>
          <button className='border border-white text-white px-1 py-1 text-sm rounded-md font-normal hover:text-black hover:bg-white'>
          Manage Device
          </button>
          <button className='border border-white text-white px-1 py-1 text-sm rounded-md font-normal hover:text-black hover:bg-white '>
            Manage Policyborder
          </button>
        </div>
      )
    }
  </nav>
  )
}

export default Navbar

// import React, { useState } from 'react'
// import mdm from '../assets/mdm.png'

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)

//   return (
//     <nav className="bg-[#03A9FC] p-4 shadow-md">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img src={mdm} alt="Logo" className="h-7 w-7" />
//           <span className="text-white font-bold text-lg">mobiHEAL MDM</span>
//         </div>

//         {/* Hamburger icon (mobile) */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="text-white text-2xl focus:outline-none"
//           >
//             {menuOpen ? '✖' : '☰'}
//           </button>
//         </div>

//         {/* Menu (desktop) */}
//         <div className="hidden md:flex space-x-4">
//           <button className="bg-white text-black px-4 py-2 rounded-md font-medium shadow-md">
//             Fetch Device Info
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Enroll Device
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Manage Device
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Manage Policy
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu (dropdown) */}
//       {menuOpen && (
//         <div className="mt-4 flex flex-col space-y-2 md:hidden">
//           <button className="bg-white text-black px-4 py-2 rounded-md font-medium shadow-md">
//             Fetch Device Info
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Enroll Device
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Manage Device
//           </button>
//           <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black">
//             Manage Policy
//           </button>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar
