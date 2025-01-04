import path from 'path';

export const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.mpg', '.m4v'];
export type MediaType = 'image' | 'video';
export const getMediaType = (url: string) => {
    return videoExtensions.includes(path.extname(url)) ? 'video' : 'image';
}

export function isImageOrVideo(filename: string) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'];
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'mpg', 'm4v'];

    // 获取文件的扩展名（不包括点）
    const extension = filename?.split('.')?.pop()?.toLowerCase();

    // 检查是否是图片或视频
    return imageExtensions.includes(extension || '')
        || videoExtensions.includes(extension || '');

}
