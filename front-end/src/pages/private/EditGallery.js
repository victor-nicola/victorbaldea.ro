import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable,
} from "@dnd-kit/core";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../api/axios";
import SortableImageItem from "../../components/SortableImageItem";
import AddImagesModal from "../../components/AddImagesModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function DroppableColumn({ id, children, style }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                backgroundColor: isOver ? "#f8f9fa" : "transparent",
                transition: "background-color 0.2s ease",
            }}
        >
            {children}
        </div>
    );
}

function DropZone({ id, isActive, style, isFirst = false }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const baseHeight = isActive ? "24px" : "4px";
    const backgroundColor = isOver ? "#007bff" : isActive ? "#e9ecef" : "transparent";

    if (!isActive)
        return;

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                height: baseHeight,
                backgroundColor,
                transition: "all 0.2s ease",
                borderRadius: "4px",
                margin: "8px 0",
                border: isOver ? "2px dashed #007bff" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: baseHeight,
            }}
        >
            {isOver && (
                <span
                    style={{
                        fontSize: "12px",
                        color: "#007bff",
                        fontWeight: "bold",
                        opacity: 0.8,
                    }}
                >
                    Drop here
                </span>
            )}
        </div>
    );
}

export default function EditGallery() {
    const { galleryName } = useParams();
    const [images, setImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [addingImage, setAddingImage] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [columnCount, setColumnCount] = useState(3);
    const [layoutMode, setLayoutMode] = useState("manual");
    const [imageColumns, setImageColumns] = useState({});
    const [imageOrder, setImageOrder] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // Use sensors for drag and drop
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    // Layout config similar to OpenedGallery:
    const getLayoutConfig = useCallback(() => {
        if (windowWidth >= 992) return { columnCount: 3, imageWidth: 400 };
        if (windowWidth >= 504) return { columnCount: 1, imageWidth: 350 };
        return { columnCount: 1, imageWidth: windowWidth * 0.7 };
    }, [windowWidth]);

    // On resize update windowWidth and columnCount accordingly
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            const { columnCount: newColumnCount } = getLayoutConfig();
            setColumnCount(newColumnCount);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getLayoutConfig]);

    // Destructure layout values
    const { columnCount: layoutColumnCount, imageWidth } = getLayoutConfig();

    // Fetch images and layout
    const fetchImages = useCallback(async () => {
        try {
            const res = await axiosPrivate.get(`/gallery/${galleryName}`);
            const fetchedImages = res.data.images;
            setImages(fetchedImages);

            const savedLayout = await axiosPrivate
                .get(`/gallery/${galleryName}/layout`)
                .then((r) => r.data)
                .catch(() => null);

            if (savedLayout) {
                setColumnCount(savedLayout.columnCount);
                setLayoutMode(savedLayout.layoutMode);
                setImageColumns(savedLayout.imageColumns || {});
                setImageOrder(
                    savedLayout.imageOrder ||
                    fetchedImages.map((img) => img.thumb)
                );
            } else {
                setImageOrder(fetchedImages.map((img) => img.thumb));
            }
        } catch (error) {
            console.error("Failed to fetch images:", error);
        }
    }, [galleryName, axiosPrivate]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
                event.preventDefault();
                navigate(`/gallery/${galleryName}`);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [navigate, galleryName]);

    // Create columns layout by distributing images by imageColumns or order
    const createLayout = (items) => {
        const columns = Array.from({ length: columnCount }, () => []);
        const sortedItems = [...items].sort((a, b) => {
            const aIndex = imageOrder.indexOf(a.thumb);
            const bIndex = imageOrder.indexOf(b.thumb);
            const aPos = aIndex === -1 ? items.length : aIndex;
            const bPos = bIndex === -1 ? items.length : bIndex;
            return aPos - bPos;
        });

        sortedItems.forEach((item, index) => {
            let col = imageColumns[item.thumb];
            if (col === undefined || col < 0 || col >= columnCount) {
                col = index % columnCount;
            }
            columns[col].push(item);
        });

        return columns;
    };

    const layout = createLayout(images);

    // Drag and drop handlers
    const handleDragStart = ({ active }) => {
        const img = images.find((i) => i.thumb === active.id);
        setActiveImage(img || null);
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveImage(null);
        if (!over) return;

        const draggedId = active.id;
        const draggedImage = images.find((img) => img.thumb === draggedId);
        if (!draggedImage) return;

        if (over.id.startsWith("drop-zone-")) {
            const parts = over.id.split("-");
            const colIndex = parseInt(parts[2]);
            const position = parseInt(parts[3]);

            const currentLayout = createLayout(images);
            const newOrderArray = [];
            currentLayout.forEach((col, idx) => {
                if (idx === colIndex) {
                    const colWithoutDragged = col.filter(
                        (img) => img.thumb !== draggedId
                    );
                    colWithoutDragged.splice(position, 0, draggedImage);
                    colWithoutDragged.forEach((img) =>
                        newOrderArray.push(img.thumb)
                    );
                } else {
                    col.filter((img) => img.thumb !== draggedId).forEach((img) =>
                        newOrderArray.push(img.thumb)
                    );
                }
            });

            const newImageColumns = { ...imageColumns, [draggedId]: colIndex };
            setImageOrder(newOrderArray);
            setImageColumns(newImageColumns);
            saveLayout(newImageColumns, newOrderArray);
            return;
        }

        if (over.id.startsWith("column-")) {
            const colIndex = parseInt(over.id.replace("column-", ""));
            const newOrderArray = imageOrder.filter((id) => id !== draggedId);
            newOrderArray.push(draggedId);
            const newImageColumns = { ...imageColumns, [draggedId]: colIndex };
            setImageOrder(newOrderArray);
            setImageColumns(newImageColumns);
            saveLayout(newImageColumns, newOrderArray);
        }
    };

    // Save layout to backend
    const saveLayout = async (newImageColumns, newImageOrder = imageOrder) => {
        try {
            await axiosPrivate.post(`/gallery/${galleryName}/layout`, {
                columnCount,
                layoutMode,
                imageColumns: newImageColumns,
                imageOrder: newImageOrder,
            });
            console.log("Layout saved successfully");
        } catch (error) {
            console.error("Failed to save layout:", error);
        }
    };

    // Delete image handler
    const handleDelete = async (filename) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            await axiosPrivate.delete(`/gallery/${galleryName}/${filename}`);
            setImages((prev) => prev.filter((i) => i.thumb !== filename));
            setImageOrder((prev) => prev.filter((id) => id !== filename));
            setImageColumns((prev) => {
                const next = { ...prev };
                delete next[filename];
                return next;
            });
        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    // Add new images handler
    const handleSaveAdd = async (files) => {
        if (!files || files.length === 0) return;

        try {
            const formData = new FormData();
            files.forEach(file => formData.append("images", file));

            await axiosPrivate.post(`/gallery/${galleryName}/images`, formData, {headers: { "Content-Type": "multipart/form-data" }});

            setAddingImage(false);
            fetchImages();
        } catch (error) {
            console.error("Failed to add images:", error);
        }
    };

    const headerRef = useRef();
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        const update = () => {
            if (headerRef.current)
                setHeaderHeight(headerRef.current.clientHeight);
        };
        update();
        const ro = new ResizeObserver(update);
        if (headerRef.current) ro.observe(headerRef.current);
        return () => ro.disconnect();
    }, []);

    return (
        <div style={{ overflowX: "hidden" }} className="default-outer-div">
            <Header ref={headerRef} />
            <div className="px-4 py-4 flex-fill" style={{ marginTop: `${headerHeight}px` }}>
                <h2>Manage Images</h2>
                <button className="btn btn-success mb-3" onClick={() => setAddingImage(true)}>
                    Add New Image
                </button>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div
                        style={{
                            display: "flex",
                            width: '100%',
                            gap: "50px",
                            justifyContent: "center",
                            paddingLeft: "50px",
                            paddingRight: "50px",
                        }}
                    >
                        {layout.map((col, colIndex) => (
                            <DroppableColumn
                                key={colIndex}
                                id={`column-${colIndex}`}
                                style={{
                                    width: imageWidth,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <DropZone id={`drop-zone-${colIndex}-0`} isActive={!!activeImage} isFirst />
                                {col.map((item, index) => (
                                    <div key={item.thumb}>
                                        <div
                                            id={`image-${item.thumb}`}
                                            style={{
                                                width: "100%",
                                                boxSizing: "border-box",
                                                position: "relative",
                                                opacity: activeImage?.thumb === item.thumb ? 0 : 1,
                                                marginBottom: "30px"
                                            }}
                                        >
                                            <SortableImageItem
                                                id={item.thumb}
                                                src={`${BASE_URL}/images/gallery/${galleryName}/${item.thumb}`}
                                                onDelete={() => handleDelete(item.thumb)}
                                                isDraggingGlobal={!!activeImage}
                                                style={{
                                                    width: "100%",
                                                    marginBottom: 0,
                                                    breakInside: "avoid",
                                                }}
                                            />
                                        </div>
                                        <DropZone id={`drop-zone-${colIndex}-${index + 1}`} isActive={!!activeImage} />
                                    </div>
                                ))}
                            </DroppableColumn>
                        ))}
                    </div>
                    <DragOverlay>
                        {activeImage && (
                            <SortableImageItem
                                id={activeImage.thumb}
                                src={`${BASE_URL}/images/gallery/${galleryName}/${activeImage.thumb}`}
                                isOverlay
                                style={{
                                    width: imageWidth,
                                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                }}
                            />
                        )}
                    </DragOverlay>
                </DndContext>
                {addingImage && (
                    <AddImagesModal
                        onClose={() => setAddingImage(false)}
                        onSave={handleSaveAdd}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
}