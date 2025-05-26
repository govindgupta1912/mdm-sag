import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUp } from "lucide-react";
import  upload from "../../assets/upload_file.png";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


const ManageContent =()=>{
      const [open, setOpen] = useState(false);



         const [files, setFiles] = useState([]);

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
    setFiles(filesWithPreview);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (!files?.file) return;
    const formData = new FormData();
    formData.append('file', files.file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    alert('Uploaded! Response: ' + JSON.stringify(result));
  };

    return(
      <div>
          <div className=" sticky top-[74px] z-40 flex justify-between bg-black p-6 items-center">
                <div className="flex text-white text-2xl font-bold">
                  <img src={upload} alt="Upload Icon" className="h-10 w-10 mr-2" />
                  <h1>Content Management</h1>
                </div>
                {/* ADD Application Modal*/}
        
                <Dialog
                //   open={open}
                  onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                      //resetForm();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    {/* <Button
                      variant="outline"
                      onClick={() => setOpen(true)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors hover:scale-105 duration-200 
                    bg-black border border-gray-300 rounded-md shadow-sm"
                    > 
                    <FileUp className="h-10 w-10 text-white" />
                    

                    </Button> */}
                    
                      <img src={upload} alt="Upload Icon" className="h-10 w-15 mr-2 hover:scale-105  " onClick={()=>setOpen(true)} />
                    
                  </DialogTrigger>
        
                  <DialogContent className="w-full sm:max-w-[500px] rounded-2xl shadow-2xl p-6 ">
                    {0 && (
                     
                      <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col gap-4 items-center justify-center z-50">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
                        <p className="text-sm text-gray-700 font-medium">
                          Uploading APK...
                        </p>
                      </div>
                    )}

                      <div className="flex flex-col items-center justify-center p-6">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer w-full max-w-md bg-gray-50 hover:bg-gray-100 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500">Drag & drop PDF or click to select</p>
        )}
      </div>

      {files && (
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Name:</strong> {files.name}</p>
          <p><strong>Size:</strong> {files.size}</p>
          <p><strong>Pages:</strong> {files.pages}</p>
          <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
{/*         
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold">
                        Add New Application
                      </DialogTitle>
                      <DialogDescription className="text-gray-500">
                        Fill in the details to create a new app.
                      </DialogDescription>
                    </DialogHeader> */}
        
                   
                    <DialogFooter className="mt-6">
                      <Button
                        onClick=""
                        className="w-full text-base py-2 rounded-xl"
                        //disabled={processing}
                      >
                        Upload Content
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

    <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Manage Content</h1>
            <p className="text-gray-600">This page is under construction.</p>
            <p className="text-gray-600">Please check back later.</p>
        </div>
      </div>
        
       
    )
}

export default ManageContent;