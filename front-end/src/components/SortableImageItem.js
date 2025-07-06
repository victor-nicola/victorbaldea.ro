import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function SortableImageItem({ id, src, onDelete, isOverlay, isDraggingGlobal, style }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
    const deleteBtn = useRef();

    // No transforms applied to the draggable itself
    const draggableStyle = {
        ...style,
        userSelect: "none",
        touchAction: "manipulation",
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.3 : 1,
        transform: "none",
        transition: "opacity 0.2s ease",
    };

    // The overlay version: clean image only
    if (isOverlay) {
        return (
            <div
                style={{
                    ...style,
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            >
                <img
                    src={src}
                    alt=""
                    style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        pointerEvents: "none",
                        userSelect: "none",
                    }}
                    draggable={false}
                />
            </div>
        );
    }

    return (
        <div ref={setNodeRef} style={draggableStyle} {...listeners} {...attributes}>
            <div className="position-relative">
                <img
                    src={src}
                    alt=""
                    style={{
                        display: "block",
                        width: "100%",
                        pointerEvents: "none",
                        userSelect: "none",
                        margin: 0,
                        padding: 0,
                    }}
                    draggable={false}
                />
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(0,0,0,0)",
                        transition: "background-color 0.2s",
                        pointerEvents: isDragging || isDraggingGlobal ? "none" : "auto",
                    }}
                    onMouseEnter={(e) => {
                        if (!isDragging && !isDraggingGlobal) {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
                            if (deleteBtn.current) deleteBtn.current.style.opacity = 1;
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isDragging && !isDraggingGlobal) {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0)";
                            if (deleteBtn.current) deleteBtn.current.style.opacity = 0;
                        }
                    }}
                >
                    <button
                        className="btn btn-danger btn-sm"
                        ref={deleteBtn}
                        style={{
                            opacity: 0,
                            transition: "opacity 0.2s",
                            pointerEvents: "auto",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDelete();
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
