import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchContentList } from "@/utilites/store/slices/contentListSlice";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const FileUploadPreview = ({ files, onRemove, uplooadProgress }) => {
//   return (
//     <div className="w-full max-w-md mt-4">
//       <ul className="space-y-4">
//         {files.map((fileObj, index) => (
//           <li
//             key={index}
//             className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center space-x-4">
//               {fileObj.preview && (
//                 <img
//                   src={fileObj.preview}
//                   alt={fileObj.name}
//                   className="h-12 w-12 object-cover rounded-md"
//                 />
//               )}
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium text-gray-800">
//                   {fileObj.name}
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   {fileObj.size} - {fileObj.type}
//                 </span>

                
//               </div>
//               {uplooadProgress[fileObj.name] >= 0 && (
//                   <>
//                     <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                       <div
//                         className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                         style={{
//                           width: `${uplooadProgress[fileObj.name]}%`,
//                         }}
//                       ></div>
//                     </div>
//                     <div className="text-xs text-right text-gray-600 mt-1">
//                       {uplooadProgress[fileObj.name] === 100
//                         ? "Uploaded"
//                         : `Uploading: ${uplooadProgress[fileObj.name]}%`}
//                     </div>
//                   </>
//                 )}
//               {/* {uplooadProgress[fileObj.name] && (
//                 <div className="text-xs text-gray-500">
//                   Uploading: {uplooadProgress[fileObj.name]}%
//                 </div>
//               )} */}
//             </div>
//             <Button
//               variant="destructive"
//               size="icon"
//               onClick={() => onRemove(index)}
//               className="h-8 w-8 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white"
//             >
//               <span className="sr-only">Remove</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

const FileUploadPreview = ({ files, onRemove, uplooadProgress }) => {
  return (
    <div className="w-full max-w-2xl mt-6 space-y-4">
      {files.map((fileObj, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 transition-all hover:shadow-lg"
        >
          <div className="flex items-center space-x-4 w-full">
            {fileObj.preview && (
              <img
                src={fileObj.preview}
                alt={fileObj.name}
                className="h-16 w-16 object-cover rounded-lg border border-gray-200"
              />
            )}
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 truncate">
                {fileObj.name}
              </div>
             <div className="text-xs text-gray-500 mt-1">
  {fileObj.size}  &middot; {fileObj.type}
</div>

              {typeof uplooadProgress[fileObj.name] === "number" && (
                <div className="mt-2">
                  <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500`}
                      style={{
                        width: `${uplooadProgress[fileObj.name]}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {uplooadProgress[fileObj.name] === 100
                      ? "✅ Uploaded"
                      : `Uploading: ${uplooadProgress[fileObj.name]}%`}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(index)}
            className="ml-4 text-gray-500 hover:text-red-600 transition-colors"
          >
            <span className="sr-only">Remove</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      ))}
    </div>
  );
};

const UploadContent = ({ open, setOpen }) => {
  const [files, setFiles] = useState([]);
  const [uplooadProgress, setUploadProgress] = useState({});

     const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) => {
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      return {
        file,
        preview,
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        type: file.type,
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  //   const handleUpload = async () => {
  //     if (files.length === 0) return;

  //     const formData = new FormData();
  //     files.forEach((fileObj) => {
  //       formData.append("files", fileObj.file);
  //     });
  // //    // formData.append("file", files.file);

  // //     const res = await fetch("http://localhost:5000/upload", {
  // //       method: "POST",
  // //       body: formData,
  // //     });

  // //     const result = await res.json();
  // //     alert("Uploaded! Response: " + JSON.stringify(result));
  //   };

  const handleUpload = async () => {
    const newProgress = {};
    setUploadProgress({}); // Reset

    for (const fileObj of files) {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", fileObj.file); // single file upload

        xhr.open("POST", `${API_BASE_URL}/api/upload_to_minio`);

        // Update progress
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress((prev) => ({
              ...prev,
              [fileObj.name]: percent,
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(formData);
      });
    }
   
    toast.success("All files uploaded successfully!");
     dispatch(fetchContentList());
     
    //alert("All files uploaded successfully!");
    setFiles([]);
    setUploadProgress({});
    setOpen(false);
  };

  return (
    <div className="upload-content">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setFiles([]);
            setUploadProgress({});
          }
        }}
      >
        {/* <DialogTrigger asChild>
                    {/* <Button
                      variant="outline"
                      onClick={() => setOpen(true)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors hover:scale-105 duration-200 
                    bg-black border border-gray-300 rounded-md shadow-sm"
                    > 
                    <FileUp className="h-10 w-10 text-white" />
                    

                    </Button> */}

        {/* </DialogTrigger> */}

        <DialogContent className="w-full sm:max-w-[500px] rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto ">
          <DialogHeader className="sticky top-[-25px] z-50 bg-white p-2 rounded-t-2xl ">
            <DialogTitle className="text-2xl font-semibold">
              Upload Files
            </DialogTitle>
            {/* <DialogDescription className="text-gray-500">
              Add files to Upload
            </DialogDescription> */}
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-6">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer w-full max-w-md bg-gray-50 hover:bg-gray-100 transition"
            >
              <input {...getInputProps()} />
              <div>
                <Plus className="h-10 w-10 text-gray-500 mb-2 mx-auto" />
                <p className="text-gray-500 mb-2">
                  {isDragActive
                    ? "Drop the files here..."
                    : "Drag & drop some files here, or click to select files"}
                </p>
              </div>
              {/* {isDragActive ? (
                <p className="text-blue-500">Drop the file here...</p>
              ) : (
                <p className="text-gray-500">
                  Drag & drop PDF or click to select
                </p>
              )} */}
            </div>

            {/* {files && (
              <div className="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {files.name}
                </p>
                <p>
                  <strong>Size:</strong> {files.size}
                </p>
                <p>
                  <strong>Pages:</strong> {files.pages}
                </p>
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            )} */}

            {files.length > 0 && (
              <FileUploadPreview
                files={files}
                onRemove={removeFile}
                uplooadProgress={uplooadProgress}
              />
            )}
          </div>
          {/*      */}

          <DialogFooter className="mt-6">
            <Button
              onClick={handleUpload}
              className="w-full text-base py-2 rounded-xl"
              disabled={files.length === 0}
            >
              Upload {files.length} {files.length > 1 ? "Files" : "File"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UploadContent;
