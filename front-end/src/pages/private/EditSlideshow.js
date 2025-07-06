import { useState, useEffect, useCallback, useRef } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../api/axios";
import imageCompression from "browser-image-compression";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SortableItem = ({ id, image, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            className="d-flex align-items-center justify-content-between border rounded p-2 mb-2 bg-white"
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className="d-flex align-items-center">
                <img
                    src={image.url}
                    alt=""
                    className="img-thumbnail me-3"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                />
                <div style={{color: 'black'}}>
                    <strong>{image.filename}</strong>
                </div>
            </div>
            <button
                className="btn btn-outline-danger btn-md"
                onClick={() => onDelete(image.filename)}
            >
                Delete
            </button>
        </div>
    );
};

export default function EditSlideshow() {
    const [deviceType, setDeviceType] = useState("pc");
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    const sensors = useSensors(useSensor(PointerSensor));

    const axiosPrivate = useAxiosPrivate();

    const fetchImages = useCallback(async() => {
        const res = await axiosPrivate.get(`/slideshow/${deviceType}`, {withCredentials: true});
        setImages(
            res.data.map((img) => ({
                ...img,
                url: `${BASE_URL}/images/slideshow/${deviceType}/${img.filename}`,
            }))
        );
    }, [deviceType, axiosPrivate]);

    useEffect(() => {
        fetchImages();
        setSelectedFiles([]);
    }, [deviceType, fetchImages]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((i) => i.filename === active.id);
            const newIndex = images.findIndex((i) => i.filename === over?.id);
            const reordered = arrayMove(images, oldIndex, newIndex);
            setImages(reordered);

            await axiosPrivate.post(`/slideshow/${deviceType}/reorder`, {
                images: reordered.map((img) => img.filename),
            });
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm(`Delete "${filename}"?`)) return;
        await axiosPrivate.delete(`/slideshow/${deviceType}/${filename}`);
        fetchImages();
    };

    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);

        // Compress all files immediately and prepare preview
        const compressedPromises = files.map(async (file) => {
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);
            return {
                file: compressedFile,
                preview: URL.createObjectURL(compressedFile),
                name: file.name,
            };
        });

        const compressedFiles = await Promise.all(compressedPromises);

        setSelectedFiles((prev) => [...prev, ...compressedFiles]);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((fileObj) => {
            formData.append("images", fileObj.file, fileObj.name);
        });

        setUploading(true);
        try {
            await axiosPrivate.post(`/slideshow/${deviceType}/upload`, formData);
            setSelectedFiles([]);
            fetchImages();
        } finally {
            setUploading(false);
        }
    };

    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (!headerRef.current) return;
            setHeaderHeight(headerRef.current.clientHeight);
        };

        updateHeight();
        
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(headerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div style={{overflowX: 'hidden'}} className='default-outer-div'>
            <Header ref={headerRef} />

            <div className="px-4 py-4 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <div className="d-flex justify-content-between align-items-center mb-3 py-4">
                    <h2>Manage Slideshow</h2>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                    >
                        Preview in Homepage
                    </a>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                        >
                            <option value="pc">PC</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>
                    <div className="col-md-8">
                        <input
                            type="file"
                            multiple
                            className="form-control"
                            onChange={handleFileSelect}
                        />
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="mb-3">
                        <h5>Files ready to upload ({selectedFiles.length})</h5>
                        <div className="row">
                            {selectedFiles.map((file, idx) => (
                                <div className="col-auto mb-2" key={idx}>
                                    <div className="position-relative">
                                        <img
                                            src={file.preview}
                                            alt=""
                                            className="img-thumbnail"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                        />
                                        <div className="small text-center mt-1">{file.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                )}

                <hr />

                <h5>
                    Images ({images.length})
                </h5>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={images.map((img) => img.filename)}
                        strategy={verticalListSortingStrategy}
                    >
                        {images.map((img) => (
                          <SortableItem
                              key={img.filename}
                              id={img.filename}
                              image={img}
                              onDelete={handleDelete}
                          />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>

            <Footer />
        </div>
    );
}