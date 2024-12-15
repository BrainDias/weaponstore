export function byteArrayToImage(byteArray) {
    const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/png' });
    return URL.createObjectURL(blob);
}