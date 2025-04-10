import { Link } from 'react-router-dom';
import enroll from '../assets/enroll.png'
import { Plus } from 'lucide-react';
import CreatePolicy from '../components/CreatePolicy';


const Policy=()=>{
    return(

        <div>Policy
            <div className='bg-black w-full flex justify-between items-center ml-4'>
               <div className=" h-20 text-white  text-2xl font-bold  p-6 flex ">
                               <img src={enroll} className="w-7 h-7"/>
                               Manage Policy
                </div>
                <Link to={'/create-policy'} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm">
              <Plus size={20} className="text-black" />
                </Link>
            </div>
            <div>

            </div>
        </div>
    )

}

export default Policy;