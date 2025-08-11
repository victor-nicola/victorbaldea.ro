import React, { useRef, useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";

export default function SortableImageItem({
    id,
    src,
    onDelete,
    isOverlay,
    isDraggingGlobal,
    showDeleteOverlay,
    onToggleDeleteOverlay,
    style,
}) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
    const deleteBtn = useRef();

    const isDraggingAny = isDragging || isDraggingGlobal;

    const draggableStyle = {
        ...style,
        userSelect: "none",
        touchAction: "none",
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.3 : 1,
        transform: "none",
        transition: "opacity 0.2s ease",
    };

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
        <div
            ref={setNodeRef}
            style={draggableStyle}
            {...listeners}
            {...attributes}
            onClick={(e) => {
                e.stopPropagation();
                if (!isDraggingAny && onToggleDeleteOverlay) {
                    onToggleDeleteOverlay();
                }
            }}
            onTouchStart={(e) => {
                e.stopPropagation();
                if (!isDraggingAny && onToggleDeleteOverlay) {
                    onToggleDeleteOverlay();
                }
            }}
            onMouseEnter={() => {
                if (!isDraggingAny && onToggleDeleteOverlay && window.matchMedia("(hover: hover)").matches) {
                    onToggleDeleteOverlay();
                }
            }}
            onMouseLeave={() => {
                // Optional: you can hide on mouse leave or keep it persistent
                // setDeleteOverlay(false); // or do nothing for persistent overlay
                // onToggleDeleteOverlay();
            }}
        >
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
                {typeof onDelete === "function" && (
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                        style={{
                            backgroundColor: showDeleteOverlay ? "rgba(0,0,0,0.5)" : "transparent",
                            transition: "background-color 0.2s",
                            pointerEvents: isDraggingAny ? "none" : "auto",
                        }}
                    >
                        <button
                            className="btn btn-danger btn-sm"
                            ref={deleteBtn}
                            style={{
                                opacity: showDeleteOverlay ? 1 : 0,
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
                )}
            </div>
        </div>
    );
}