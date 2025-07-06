import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

export default function EditGalleryModal({ gallery, onClose, onSave }) {
    const [name, setName] = useState(gallery.name);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(gallery.coverUrl);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(gallery.coverUrl);
        }
    }, [file, gallery.coverUrl]);

    const handleSave = async () => {
        if (!file) {
            alert('Please upload a cover image');
            return;
        }
        
        setSaving(true);
        let finalFile = file;

        if (file) {
            try {
                finalFile = await imageCompression(file, {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                });
            } catch (err) {
                console.error("Error compressing image:", err);
                alert("Image compression failed.");
                setSaving(false);
                return;
            }
        }

        await onSave(gallery.id, name, finalFile);
        setSaving(false);
    };

    return (
        <div
            className="modal-backdrop align-content-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        >
            <div className="modal-content p-4 align-items-center justify-content-center">
                <h4>Edit Gallery</h4>
                <div className="preview-gallery mb-3">
                    <img src={previewUrl} alt={name} />
                    <input
                        type="text"
                        className="form-control mb-2 mt-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="file"
                        className="form-control mb-2"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary me-5"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <button className="btn btn-secondary" onClick={onClose} disabled={saving}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
