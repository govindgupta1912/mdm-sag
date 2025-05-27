import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, FileUp, Trash2 } from "lucide-react";
import  upload from "../../assets/upload_file.png";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadContent from "./UploadContent";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentList } from "@/utilites/store/slices/contentListSlice";
import { Link } from "react-router-dom";


const ManageContent =()=>{
      const [open, setOpen] = useState(false);
      const dispatch = useDispatch();
      const {
        list: contentList,
        status,
        error,
      } = useSelector((state) => state.contentList);

      useEffect(()=>{
        dispatch(fetchContentList());
      },[dispatch]);

      console.log("contentList", contentList);
    
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
        {/* <div>
          
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
                contentList.map((content)=>(
                  <TableRow key={content.id}>
                    <TableCell>{content.filename}</TableCell>
                    <TableCell>{content.filetype}</TableCell>
                    <TableCell>{content.size}</TableCell>
                    <TableCell>{content.created_on}</TableCell>
                    <TableCell>
                      <Button>
                        <Trash2/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
              <TableFooter>

              </TableFooter>
          </Table>
        </div> */}
          
        <div className="w-full p-4">
          <div className="hidden sm:block overflow-x-auto">
            {/* Standard table for tablets and up */}
            <Table className="table-auto border-separate border-spacing-y-2 w-full text-sm sm:text-base">
              <TableCaption className="mb-4 text-gray-600">
                A list of all Content.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-[#03A9FC] text-white rounded-md">
                 
                  <TableHead className="py-4 text-white">
                    File Name
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    File Type
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    File Size
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    TimeStamp
                  </TableHead>
                  <TableHead className="py-4 text-white text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {status === "loading"
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <TableRow
                          key={index}
                          className="bg-white shadow-sm hover:bg-gray-200 animate-pulse rounded-lg"
                        >
                          {[...Array(6)].map((_, i) => (
                            <TableCell key={i} className="py-4 text-center">
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                  : contentList?.map((content, index) => (
                      <TableRow
                        key={index}
                        className="bg-white shadow-sm transition-colors duration-200 rounded-lg hover:bg-blue-50"
                      >

                        <TableCell className="py-4 font-mono">
                          {content.filename}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {content.filetype}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {content.size}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {content.created_on}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <div className="flex justify-center gap-4">
                            <Link
                              // to="/devices-details"
                              state={{ content }}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="View Device Details"
                            >
                              <Eye size={20} />
                            </Link>
                            <button
                              // onClick={() => delete_enroll_devices(device)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete Device"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-sm text-muted-foreground pt-6"
                  >
                    Showing {contentList.length} content
                    {contentList.length !== 1 ? "s" : ""}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {/* Mobile Version - Cards */}
          <div className="sm:hidden space-y-4">
            {contentList?.map((content, index) => (
              <div
                key={index}
                // className={`rounded-xl border shadow-sm p-4 ${
                //   selectedIds.includes(content.id)
                //     ? "bg-blue-50"
                //     : "bg-white"
                // }`}
              >
                <div className="flex justify-between items-center mb-2">
                 
                  <div className="flex gap-4">
                    <Link
                      // to="/devices-details"
                      state={{ content }}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye size={20} />
                    </Link>
                    <button
                      // onClick={() => delete_enroll_devices(content)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="text-sm">
                  <div>
                    <span className="font-semibold">File Name:</span>{" "}
                    {content.filename}
                  </div>
                  <div>
                    <span className="font-semibold">File Type:</span>{" "}
                    {content.filetype}
                  </div>
                  <div>
                    <span className="font-semibold">File Size:</span> {content.size}
                  </div>
                  <div>
                    <span className="font-semibold">TimeStamp:</span>{" "}
                    {content.created_on}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      <UploadContent open={open} setOpen={setOpen}/> 
      </div>
        
       
    )
}

export default ManageContent;