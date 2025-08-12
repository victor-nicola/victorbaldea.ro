import { Link } from "react-router-dom";

export default function GalleryItem({ gallery }) {
    const slug = gallery.slug
        ? gallery.slug
        : gallery.name.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="preview-gallery">
                <Link to={`/gallery/${slug}`}>
                    <img
                        src={gallery.coverUrl}
                        alt={gallery.name}
                        style={{ cursor: "pointer" }}
                    />
                </Link>
                <div className="title mt-2">
                    <p>{gallery.name}</p>
                </div>
            </div>
        </div>
    );
}
