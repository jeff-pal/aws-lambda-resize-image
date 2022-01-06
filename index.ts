'use strict';
import Jimp from 'jimp';

const supportedExtensions = {
    bmp: Jimp.MIME_BMP,
    jpg: Jimp.MIME_JPEG,
    jpeg: Jimp.MIME_JPEG,
    png: Jimp.MIME_PNG,
};

type File = {
    name: string,
    mimetype: string,
    extension: string,
    buffer: Buffer,
    data: Buffer,
};

type Options = {
    width: number,
    height: number
}

async function awsResizeImage(file: File, options: Options) {
    const buffer    = file.buffer || file.data;
    const mimetype  = file.mimetype;
    const extension = file.extension;

    if (!Buffer.isBuffer(buffer)) {
        throw new TypeError(
            `Expected 'buffer' to be of type 'Buffer' but received type ${typeof buffer}`
        );
    }

    if (!extension || !Object.keys(supportedExtensions).includes(extension)) {
        throw new Error('Image format not supported');
    }

    if (
        isNaN(options?.width) && isNaN(options?.height)
    ) {
        throw new TypeError('Either `width` or `height` is required in options.');
    }

    const image = await Jimp.read(buffer);

    if (isNaN(options?.width)) {
        options.width = Math.trunc(
            image.bitmap.width * (options.height / image.bitmap.height)
        );
    }

    if (isNaN(options?.height)) {
        options.height = Math.trunc(
            image.bitmap.height * (options.width / image.bitmap.width)
        );
    }

    return image.resize(options.width, options.height).getBufferAsync(mimetype);
};

export default awsResizeImage;
export { File, Options };