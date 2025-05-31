import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, FileUp, Pen, Trash2 } from "lucide-react";
import upload from "../../assets/upload_file.png";
import Content_Icon from "../../assets/Content_Icon.svg";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadContent from "./UploadContent";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentList } from "@/utilites/store/slices/contentListSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RiEdit2Fill } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EditContentDialog from "./EditContentDialog";
import { ImUpload3 } from "react-icons/im";
import { BiUpload } from "react-icons/bi";
import { RiUploadCloud2Line } from "react-icons/ri";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageContent = () => {
  const [open, setOpen] = useState(false);
  //const [contentModalOpen,setContentModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [editPath, setEditPath] = useState("");
  const [editFileName, setEditFileName] = useState("");
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [selectedContentData, setSelectedContentData] = useState(null);

  const dispatch = useDispatch();
  const {
    list: contentList,
    status,
    error,
  } = useSelector((state) => state.contentList);

  useEffect(() => {
    dispatch(fetchContentList());
  }, [dispatch]);

  console.log("contentList", contentList);

  const delete_content = async (content_id) => {
    console.log("kjgbsdkgbkilnhfesdlj v");

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/delete_content`, {
        content_id: content_id,
      });
      console.log("content_response===========", response);

      if (response.data.status) {
        toast.success(response.data?.message || "Content deleted");
        dispatch(fetchContentList());
      } else {
        toast.error(response.data?.message || "Error deleting content");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // const handelSave=async()=>{
  //    setLoading(true);
  //   try {
  //      const Edit_Content_Response= await axios.post(`${API_BASE_URL}/api/edit_content`,{
  //       content_id:selectedContent,
  //       filename:editFileName,
  //       filepath:editPath
  //      })

  //      if(Edit_Content_Response.data.status){
  //       toast.success(Edit_Content_Response?.data?.message || "Content Edited Successfully");

  //        setContentModalOpen(false);
  //        dispatch(fetchContentList());
  //      }else {
  //       toast.error(Edit_Content_Response.data?.message || "Error Will Editing The Content")
  //      }

  //      console.log("edit_content_response=====",Edit_Content_Response);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message)

  //   }

  //   setLoading(false);

  // }

  //  const Edit_Content =(content)=>{

  //     setSelectedContent(content.content_id);
  //   setEditPath(content?.path || "");
  //   setEditFileName(content?.filename || "")
  //   setContentModalOpen(true);

  //  }

  const Edit_Content = (content) => {
    setSelectedContentData(content);
    setContentModalOpen(true);
  };

  //   const editDialog = (
  //   <Dialog open={contentModalOpen} onOpenChange={setContentModalOpen}>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Edit File Path</DialogTitle>
  //       </DialogHeader>
  //       <div className="space-y-4">
  //         <Label htmlFor="edit-path">File Path</Label>
  //         <Input
  //           id="edit-path"
  //           value={editPath}
  //           onChange={(e) => setEditPath(e.target.value)}
  //         />
  //       </div>
  //        <div className="space-y-4">
  //         <Label htmlFor="edit-filename">File Name</Label>
  //         <Input
  //           id="edit-filename"
  //           value={editFileName}
  //           onChange={(e) => setEditFileName(e.target.value)}
  //         />
  //       </div>
  //       <DialogFooter>
  //         <Button onClick={async () => {
  //           // Save logic here
  //           await handelSave()
  //           console.log("Saving path", editPath, "for", selectedContent);

  //         }}>
  //           Save
  //         </Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <>
      {/* {editDialog} */}
      <EditContentDialog
        open={contentModalOpen}
        setOpen={setContentModalOpen}
        selectedContent={selectedContentData?.content_id}
        contentData={selectedContentData}
        onSave={() => dispatch(fetchContentList())}
      />
        <UploadContent open={open} setOpen={setOpen} />
      <div>
       
<div className="sticky top-[74px] z-40 flex justify-between  bg-dark px-4 py-6 h-[68px] items-center shadow">
  <div className="flex text-white text-xl font-semibold">
    <img src={Content_Icon} alt="Upload Icon" className="h-7 w-7 mr-2" />
    <h1>Content Management</h1>
  </div>

  <button className="hover:scale-105 " onClick={() => setOpen(true)}>
 
    <RiUploadCloud2Line className="text-black bg-white p-2 h-10 w-10 rounded-md shadow-sm hover:scale-105 transition-transform" />

  </button>
</div>

        <div className="w-full ">
          <div className="hidden sm:block overflow-x-auto">
            {/* Standard table for tablets and up */}
            <Table className="table-auto border-separate border-spacing-y-2 w-full text-sm sm:text-base">
              {/* <TableCaption className="mb-4 text-gray-600">
                A list of all Content.
              </TableCaption> */}
              <TableHeader>
                <TableRow className="bg-[#03A9FC] text-white rounded-md">
                  <TableHead className="py-4 text-white">File Name</TableHead>
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
                {status === "loading" || loading
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <TableRow
                          key={index}
                          className="bg-white shadow-sm hover:bg-gray-200 animate-pulse rounded-lg"
                        >
                          {[...Array(5)].map((_, i) => (
                            <TableCell key={i} className="py-4 text-center">
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                  : contentList?.map((content, index) => (
                      <TableRow
                        key={content.content_id}
                        className="bg-white shadow-sm transition-colors duration-200 rounded-lg hover:bg-blue-50"
                      >
                        <TableCell className="py-4 font-mono">
                          {content.filename}.{content.filetype}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {content.filetype}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {content.size} MB
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          {new Intl.DateTimeFormat("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(new Date(content.created_on))}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => Edit_Content(content)}
                              className="text-orange-500 hover:text-orange-800 transition"
                              title="Edit"
                            >
                              <RiEdit2Fill size={20} />
                            </button>
                            <button
                              onClick={() => {
                                console.log(
                                  "Button clicked",
                                  content.content_id
                                );
                                delete_content(content.content_id);
                              }}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete Content"
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
          <div className="sm:hidden space-y-4 ">
            {contentList?.map((content, index) => (
              <div
                key={index}
                // className={`rounded-xl border shadow-sm p-4 ${
                //   selectedIds.includes(content.id)
                //     ? "bg-blue-50"
                //     : "bg-white"
                // }`}
                className="bg-white shadow-sm transition-colors duration-200 rounded-lg hover:bg-blue-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4">
                    <button
                      onClick={() => Edit_Content(content)}
                      className="text-orange-500 hover:text-orange-800 transition"
                      title="Edit"
                    >
                      <RiEdit2Fill size={20} />
                    </button>
                    <button
                      onClick={() => delete_content(content.content_id)}
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
                    <span className="font-semibold">File Size:</span>{" "}
                    {content.size}
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
      </div>
    </>
  );
};

export default ManageContent;
