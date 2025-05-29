// components/EditContentDialog.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditContentDialog = ({ open, setOpen, selectedContent, contentData, onSave }) => {
  const [editPath, setEditPath] = useState(contentData?.path || "");
  const [editFileName, setEditFileName] = useState(contentData?.filename || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditPath(contentData?.path || "");
    setEditFileName(contentData?.filename || "");
  }, [contentData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/edit_content`, {
        content_id: selectedContent,
        filename: editFileName,
        filepath: editPath,
      });

      if (response.data.status) {
        toast.success(response.data.message || "Content updated");
        onSave(); // refresh list
        setOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error editing content");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit File Path</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="edit-path">File Path</Label>
          <Input id="edit-path" value={editPath} onChange={(e) => setEditPath(e.target.value)} />
        </div>
        <div className="space-y-4">
          <Label htmlFor="edit-filename">File Name</Label>
          <Input id="edit-filename" value={editFileName} onChange={(e) => setEditFileName(e.target.value)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentDialog;
