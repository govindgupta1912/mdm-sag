import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import devices from '../assets/devices.png'
import { Eye, Trash2 } from 'lucide-react';

const ManageDevices=()=>{

    
      const devicesList = [
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
        {
          id: "RZ25OPULZ",
          deviceName: "Microsoft",
          model: "Royal",
          policyName: "Office IT Policy",
          lastSynced: "2024-09-24 15:01:44",
        },
      ];
      

    return(
        <div>
            <div className='flex justify-start gap-2 bg-black p-6 text-center'>
                <img src={devices} alt="" />
                <p className='text-white text-2xl font-bold'>Manage Devices</p>
            </div>

             <div className="overflow-x-auto w-full p-4">
                    <Table className="table-fixed border-separate border-spacing-y-2 w-full text-sm sm:text-base">
                      <TableCaption className="mb-4">A list of all Devices.</TableCaption>
                      <TableHeader>
                        <TableRow className="bg-[#03A9FC] text-white  ">
                          <TableHead className="text-white min-w-[100px] w-[100px] py-4">
                          Serial No.
                          </TableHead>
                          <TableHead className="text-white min-w-[100px] w-[100px]">
                          Device Name
                          </TableHead>
                          <TableHead className="text-white min-w-[180px] w-[100px]">
                          Model
                          </TableHead>
                          <TableHead className="text-white  w-[100px]">
                          Policy Name
                          </TableHead>
                          <TableHead className="text-white text-center w-[100px]">
                          Last Synced
                          </TableHead>
                          <TableHead className="text-white text-center w-[100px]">
                          Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devicesList.map((policy, index) => (
                          <TableRow
                            key={index}
                            className=" bg-white shadow-sm hover:bg-gray-200"
                          >
                            <TableCell className="py-4 font-mono ">
                              {policy.id}
                            </TableCell>
                            <TableCell className="py-4 ">{policy.deviceName}</TableCell>
                            <TableCell className="py-4  ">
                              {policy.model}
                            </TableCell>
                            <TableCell className="py-4 ">
                              {policy.policyName}
                            </TableCell>
                            <TableCell className="py-4">
                              {policy. lastSynced}
                            </TableCell>
                            <TableCell className="py-4 flex gap-4 justify-end w-[120px] items-center">
                              <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => update(policy)}
                              >
                                <Eye size={20} />
                              </button>
                              <button className="text-red-600 hover:text-red-800">
                                <Trash2 size={20} />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-sm text-muted-foreground"
                          >
                            Showing {devicesList.length} policies
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
        </div>
    )
}

export default ManageDevices;