import React, { useState, useEffect } from "react";
import { processImage } from "../utils/imageProcessor";

export default function AddImageModal({ onClose, onSave }) {
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (files.length === 0) {
            setPreviewUrls([]);
            return;
        }

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => urls.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const removeImage = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        
        // Clear the input to reset its display text
        const input = document.querySelector('input[type="file"]');
        if (input) {
            input.value = '';
        }
    };

    const handleSave = async () => {
        if (files.length === 0) return;
        if (files.length > 20) {
            alert('Max 20 files!');
            return;
        }

        setSaving(true);

        try {
            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    try {
                        return await processImage(file, 1920, 4);
                    } catch (err) {
                        console.error("Error compressing image:", err);
                        return file; // fallback to original file
                    }
                })
            );

            await onSave(compressedFiles);
        } catch (err) {
            console.error("Error saving images:", err);
            alert("Failed to save images.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        >
            <div 
                className="modal-content p-4 align-items-center"
                style={{ 
                    width: '40%',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                <h4>Add Images</h4>

                <div className="mb-3">
                    <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        id="file-input"
                    />
                    <button
                        type="button"
                        className="btn btn-outline-warning"
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        Choose Images
                    </button>
                </div>

                {previewUrls.length > 0 && (
                    <div className="mb-3">
                        <div className="d-flex flex-wrap gap-3 justify-content-center">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="position-relative">
                                    <img 
                                        src={url} 
                                        alt={`Preview ${index + 1}`}
                                        style={{ 
                                            width: '100px', 
                                            height: '100px',
                                            objectFit: 'cover',
                                            marginBottom: '15px'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                        onClick={() => removeImage(index)}
                                        disabled={saving}
                                        style={{ 
                                            width: '20px', 
                                            height: '20px',
                                            padding: '0',
                                            fontSize: '12px',
                                            transform: 'translate(50%, -50%)'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary me-5"
                        onClick={handleSave}
                        disabled={saving || files.length === 0}
                    >
                        {saving ? "Saving..." : "Add"}
                    </button>
                    <button className="btn btn-secondary" onClick={onClose} disabled={saving}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}