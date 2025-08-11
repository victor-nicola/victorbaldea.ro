import imageCompression from 'browser-image-compression';

/**
 * Resize image to fixed width (preserves aspect ratio) and then compress if size > maxSizeMB.
 * @param {File|Blob} file - Original image file or blob
 * @param {number} targetWidth - Desired width in pixels (e.g. 1920)
 * @param {number} maxSizeMB - Max final file size in MB (e.g. 2)
 * @returns {Promise<Blob>} - Processed image as a Blob
 */

const blobToFile = (blob, filename) => {
    return new File([blob], filename, { type: blob.type, lastModified: Date.now() });
};

export async function processImage(file, targetWidth = 1920, maxSizeMB = 2) {
    const resizedBlob = await resizeImageToWidth(file, targetWidth);
    const finalBlob = await compressIfTooBig(resizedBlob, maxSizeMB);
    return blobToFile(finalBlob, file.name);
}

async function resizeImageToWidth(file, targetWidth) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
            img.src = reader.result;
        };

        img.onerror = reject;

        img.onload = () => {
            const aspectRatio = img.height / img.width;
            const targetHeight = targetWidth * aspectRatio;

            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(blob => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Canvas conversion failed"));
                }
            }, 'image/jpeg', 1); // Max quality
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function compressIfTooBig(blob, maxSizeMB) {
    const currentSizeMB = blob.size / 1024 / 1024;

    if (currentSizeMB <= maxSizeMB) {
        return blob; // No compression needed
    }

    const options = {
        maxSizeMB,
        useWebWorker: true,
        maxWidthOrHeight: undefined // Do not resize again
    };

    return await imageCompression(blob, options);
}
