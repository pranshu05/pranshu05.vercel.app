export interface UnsplashApiPhoto {
    id: string
    width: number
    height: number
    description: string | null
    alt_description: string | null
    urls: { regular: string; small: string; thumb: string }
    location?: {
        name?: string
        title?: string
        city?: string
        country?: string
    } | null
    exif?: {
        make?: string | null
        model?: string | null
        exposure_time?: string | null
        aperture?: string | null
        focal_length?: string | null
        iso?: number | null
    } | null
}

export interface GalleryPhotoExif {
    camera: string | null
    exposureTime: string | null
    aperture: string | null
    focalLength: string | null
    iso: number | null
}

export interface GalleryPhotoPayload {
    id: string
    width: number
    height: number
    urls: { regular: string; small: string; thumb: string }
    caption: string | null
    location: string | null
    exif: GalleryPhotoExif | null
}

function formatLocation(loc: UnsplashApiPhoto["location"]): string | null {
    if (!loc) return null
    const parts = [loc.name || loc.title, loc.city, loc.country].filter(Boolean) as string[]
    return parts.length ? parts.join(" · ") : null
}

export function normalizeUnsplashPhoto(image: UnsplashApiPhoto): GalleryPhotoPayload {
    const camera = [image.exif?.make, image.exif?.model].filter(Boolean).join(" ").trim() || null
    const exifBlock = image.exif
        ? {
            camera,
            exposureTime: image.exif.exposure_time ?? null,
            aperture: image.exif.aperture ?? null,
            focalLength: image.exif.focal_length ?? null,
            iso:
                image.exif.iso != null && image.exif.iso > 0 ? image.exif.iso : null,
        }
        : null

    return {
        id: image.id,
        width: image.width,
        height: image.height,
        urls: {
            regular: image.urls.regular,
            small: image.urls.small,
            thumb: image.urls.thumb,
        },
        caption: image.description?.trim() || image.alt_description?.trim() || null,
        location: formatLocation(image.location ?? null),
        exif: exifBlock,
    }
}