import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../api/axios";
import SortableGalleryItem from "../../components/SortableGalleryItem";
import EditGalleryModal from "../../components/EditGalleryModal";
import AddGalleryModal from "../../components/AddGalleryModal";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function EditGalleries() {
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState([]);
    const [editingGallery, setEditingGallery] = useState(null);
    const [addingGallery, setAddingGallery] = useState(false);
    const [activeGallery, setActiveGallery] = useState(null);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1248);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 10 },
        })
    );

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (editingGallery || addingGallery) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [editingGallery, addingGallery]);

    const fetchGalleries = useCallback(async () => {
        const res = await axiosPrivate.get("/gallery");
        setGalleries(
            res.data.map((g) => ({
                ...g,
                coverUrl: `${BASE_URL}/images/gallery/800/${g.coverFilename}`,
            }))
        );
    }, [axiosPrivate]);

    useEffect(() => {
        fetchGalleries();
    }, [fetchGalleries]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
                event.preventDefault();
                navigate('/gallery');
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1248);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleDragStart = ({ active }) => {
        const draggedGallery = galleries.find((g) => g.id === active.id);
        setActiveGallery(draggedGallery || null);
    };

    const handleDragEnd = async ({ active, over }) => {
        if (active.id !== over?.id) {
            const oldIndex = galleries.findIndex((g) => g.id === active.id);
            const newIndex = galleries.findIndex((g) => g.id === over?.id);
            const reordered = arrayMove(galleries, oldIndex, newIndex);
            setGalleries(reordered);
            await axiosPrivate.post("/gallery/reorder", {
                ids: reordered.map((g) => g.id),
            });
        }
        setActiveGallery(null);
    };

    const handleDragCancel = () => {
        setActiveGallery(null);
    };

    const handleDelete = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm("Delete this gallery?")) return;
        await axiosPrivate.delete(`/gallery/${id}`);
        fetchGalleries();
    };

    const handleEdit = (gallery, e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditingGallery(gallery);
    };

    const handleSaveEdit = async (galleryId, name, file) => {
        const formData = new FormData();
        formData.append("name", name);
        if (file) {
            formData.append("cover", file, file.name);
        }
        await axiosPrivate.put(`/gallery/${galleryId}`, formData);
        setEditingGallery(null);
        fetchGalleries();
    };

    const handleSaveAdd = async (name, file) => {
        const formData = new FormData();
        formData.append("name", name);
        if (file) {
            formData.append("cover", file, file.name);
        }
        try {
            await axiosPrivate.post(`/gallery`, formData);
        } catch (err) {
            if (!err?.response) {
                alert('Server didn\'t answer');
            } else if (err.response?.status === 500) {
                alert('Gallery already exists');
            }
        }
        setAddingGallery(false);
        fetchGalleries();
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
        <div style={{ overflowX: "hidden" }} className="default-outer-div">
            <Header ref={headerRef} />

            <div className="px-4 py-4 flex-fill" style={{marginTop: `${headerHeight}px`}}>
                <h2>Manage Galleries</h2>
                <button className="btn btn-success mb-3" onClick={() => setAddingGallery(true)}>
                    Add New Gallery
                </button>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <SortableContext items={galleries.map((g) => g.id)} strategy={rectSortingStrategy}>
                        <div
                            className="gallery-grid"
                            style={{
                                display: "grid",
                                gridTemplateColumns: isLargeScreen ? "1fr 1fr" : "1fr",
                                gap: "45px 60px",
                            }}
                        >
                            {galleries.map((gallery, index) => {
                                const isLastSingle =
                                    isLargeScreen && galleries.length % 2 === 1 && index === galleries.length - 1;

                                return (
                                    <div
                                        key={gallery.id}
                                        style={{
                                            gridColumn: isLastSingle ? "span 2" : undefined,
                                            display: "flex",
                                            justifyContent: isLastSingle
                                                ? "center"
                                                : isLargeScreen
                                                ? index % 2 === 0
                                                    ? "flex-end"
                                                    : "flex-start"
                                                : "center",
                                            position: "relative",
                                            width: "100%",
                                        }}
                                    >
                                        <SortableGalleryItem
                                            id={gallery.id}
                                            gallery={gallery}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </SortableContext>

                    <DragOverlay>
                        {activeGallery ? (
                            <div style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)", width: "fit-content" }}>
                                <SortableGalleryItem
                                    id={activeGallery.id}
                                    gallery={activeGallery}
                                    onEdit={() => {}}
                                    onDelete={() => {}}
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                {editingGallery && (
                    <EditGalleryModal
                        gallery={editingGallery}
                        onClose={() => setEditingGallery(null)}
                        onSave={handleSaveEdit}
                    />
                )}
                {addingGallery && (
                    <AddGalleryModal onClose={() => setAddingGallery(false)} onSave={handleSaveAdd} />
                )}
            </div>

            <Footer />
        </div>
    );
}