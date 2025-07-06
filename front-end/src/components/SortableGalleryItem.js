import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import "../styles/gallery.css";
import { Link } from "react-router-dom";

export default function SortableGalleryItem({ id, gallery, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const [isHovered, setIsHovered] = useState(false);
    const slug = gallery.slug
        ? gallery.slug
        : gallery.name.toLowerCase().replace(/\s+/g, "-");

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
        cursor: isDragging ? "grabbing" : "grab",
        width: "fit-content",
        maxWidth: "100%",
        userSelect: "none",
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`d-flex flex-column justify-content-center${isDragging ? " dragging" : ""}`}
        >
            <div className="preview-gallery" style={{ width: "100%" }}>
                <Link to={`/edit-gallery/${slug}`}>
                    <img
                        src={gallery.coverUrl}
                        alt={gallery.name}
                        className={isDragging ? "dragging-img" : ""}
                        style={{ opacity: isHovered ? 0.7 : 1, display: "block", width: "100%" }}
                        draggable={false}
                    />
                </Link>
                <div className="d-flex flex-row justify-content-between mt-2 w-100">
                    <div className="title">
                        <p>{gallery.name}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary me-4" onClick={(e) => onEdit(gallery, e)}>
                            Edit
                        </button>
                        <button className="btn btn-danger" onClick={(e) => onDelete(gallery.id, e)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
