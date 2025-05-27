import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUp } from "lucide-react";
import  upload from "../../assets/upload_file.png";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadContent from "./UploadContent";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const ManageContent =()=>{
      const [open, setOpen] = useState(false);



    
    return(
      <div>
          <div className=" sticky top-[74px] z-40 flex justify-between bg-black p-6 items-center">
                <div className="flex text-white text-2xl font-bold">
                  <img src={upload} alt="Upload Icon" className="h-10 w-10 mr-2" />
                  <h1>Content Management</h1>
                </div>
                {/* ADD Application Modal*/}
        
                 <img src={upload} alt="Upload Icon" className="h-10 w-15 mr-2 hover:scale-105  " onClick={()=>setOpen(true)} />
                    
              </div>

    <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Manage Content</h1>
            <p className="text-gray-600">This page is under construction.</p>
            <p className="text-gray-600">Please check back later.</p>
        </div>
        <div>
          
          <Table>
            <TableCaption>

            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">File Name</TableHead>
                <TableHead className="text-left">File Type</TableHead>
                <TableHead className="text-left">File Size</TableHead>
                <TableHead className="text-left"> TimeStamp</TableHead>
                <TableHead className="text-left">Actions</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {

              }
              </TableBody>
              <TableFooter>

              </TableFooter>
          </Table>
        </div>
          
      <UploadContent open={open} setOpen={setOpen}/> 
      </div>
        
       
    )
}

export default ManageContent;