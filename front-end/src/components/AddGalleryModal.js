import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

export default function AddGalleryModal({ onClose, onSave }) {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

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

        await onSave(name, finalFile);
        setSaving(false);
    };

    return (
        <div
            className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        >
            <div className="modal-content p-4 align-items-center w-100 mw-100">
                <h4>Add Gallery</h4>
                <div className="preview-gallery mb-3">
                    {previewUrl && (
                        <img
                            src={previewUrl} 
                            alt={name} 
                            className="img-fluid d-block mx-auto mb-3"
                            style={{objectFit: 'contain'}}
                        />
                    )}
                    <input
                        type="text"
                        className="form-control mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Gallery name"
                    />
                    <input
                        type="file"
                        className="form-control mb-3"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary me-2"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Add"}
                        </button>
                        <button 
                            className="btn btn-secondary ms-2" 
                            onClick={onClose} 
                            disabled={saving}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
