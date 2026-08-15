"use client"
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from 'react-icons/md';
import type { GalleryPhotoExif, GalleryPhotoPayload } from '@/lib/unsplashPhoto';

function mergeExif(base: GalleryPhotoExif | null, detail: GalleryPhotoExif | null,): GalleryPhotoExif | null {
    if (!detail) return base;
    if (!base) return detail;
    return {
        camera: detail.camera ?? base.camera,
        exposureTime: detail.exposureTime ?? base.exposureTime,
        aperture: detail.aperture ?? base.aperture,
        focalLength: detail.focalLength ?? base.focalLength,
        iso: detail.iso ?? base.iso,
    };
}

function hasExposureMeta(exif: GalleryPhotoExif | null): boolean {
    if (!exif) return false;
    return !!(
        exif.aperture ||
        exif.exposureTime ||
        exif.iso != null ||
        exif.focalLength ||
        exif.camera
    );
}

function SpecItem({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="min-w-22 text-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{label}</p>
            <div className="mt-1 font-mono text-base leading-snug text-zinc-100 md:text-lg">{children}</div>
        </div>
    );
}

function GalleryLightboxSpecs({ width, height, exif }: { width: number, height: number, exif: GalleryPhotoExif | null }) {
    return (
        <footer className="mt-4 w-full max-w-3xl shrink-0 self-center px-2 pb-1 pt-4 md:mt-6">
            {hasExposureMeta(exif) ? (
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12">
                    {exif?.aperture ? (<SpecItem label="ƒ-stop">ƒ/{exif.aperture}</SpecItem>) : null}
                    {exif?.exposureTime ? (<SpecItem label="Shutter">{exif.exposureTime}</SpecItem>) : null}
                    {exif?.iso != null ? (<SpecItem label="ISO">{exif.iso}</SpecItem>) : null}
                    {exif?.focalLength ? (<SpecItem label="Focal">{exif.focalLength} mm</SpecItem>) : null}
                    {exif?.camera ? (<SpecItem label="Camera">{exif.camera}</SpecItem>) : null}
                </div>
            ) : (
                <p className="text-center text-xs leading-relaxed text-zinc-500">Unsplash didn&apos;t provide ƒ-stop / ISO / shutter metadata for this file.</p>
            )}
            <p className="mt-4 text-center font-mono text-[11px] text-zinc-600">{width.toLocaleString()} × {height.toLocaleString()} px</p>
        </footer>
    );
}

function revealWhenMeaningfullyVisible(entry: IntersectionObserverEntry): boolean {
    if (!entry.isIntersecting) return false;
    if (entry.intersectionRatio >= 0.6) return true;
    const root = entry.rootBounds;
    const target = entry.boundingClientRect;
    if (!root || root.height <= 0) return false;
    if (target.height > root.height * 0.92) { return entry.intersectionRect.height / root.height >= 0.45; }
    return false;
}

function GalleryImageTile({ width, height, urls, onClick }: { width: number, height: number, urls: GalleryPhotoPayload['urls'], onClick: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loadImages, setLoadImages] = useState(false);
    const [fullLoaded, setFullLoaded] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const prefetch = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;
                setLoadImages(true);
                prefetch.disconnect();
            },
            { rootMargin: '200px 0px 240px 0px', threshold: 0 },
        );

        prefetch.observe(el);
        return () => prefetch.disconnect();
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const reveal = new IntersectionObserver(
            ([entry]) => {
                if (!entry || !revealWhenMeaningfullyVisible(entry)) return;
                el.classList.add('gallery-photo-inview');
                reveal.disconnect();
            },
            { rootMargin: '0px', threshold: [0, 0.15, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.75, 1] },
        );

        reveal.observe(el);
        return () => reveal.disconnect();
    }, []);

    const ratio = width > 0 && height > 0 ? `${width} / ${height}` : '3 / 4';

    return (
        <div ref={containerRef} className="gallery-photo-frame relative mb-2 cursor-pointer overflow-hidden rounded-lg" style={{ aspectRatio: ratio }} onClick={onClick}>
            {loadImages && (
                <>
                    <img src={urls.small} alt="" decoding="async" className={`absolute inset-0 z-2 h-full w-full object-cover grayscale transition-opacity duration-500 ease-out motion-reduce:transition-none ${fullLoaded ? 'opacity-0' : 'opacity-100'} blur-lg motion-reduce:blur-md`} aria-hidden />
                    <img src={urls.regular} alt="" decoding="async" className={`absolute inset-0 z-3 h-full w-full object-cover grayscale transition-opacity duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-300 ${fullLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setFullLoaded(true)} onError={() => setFullLoaded(true)} />
                </>
            )}
        </div>
    );
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<GalleryPhotoPayload[]>([])
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [detailExif, setDetailExif] = useState<GalleryPhotoExif | null>(null)

    const lightboxPhoto = selectedImageIndex !== null && imageData.length > 0 ? (imageData[selectedImageIndex] ?? null) : null;

    useEffect(() => {
        setDetailExif(null);
        if (!lightboxPhoto?.id) return;
        const ac = new AbortController();
        fetch(`/api/unsplash-photo?id=${encodeURIComponent(lightboxPhoto.id)}`, { signal: ac.signal, })
            .then((r) => r.json())
            .then((d: { exif?: GalleryPhotoExif | null }) => { if (d.exif) setDetailExif(d.exif); })
            .catch(() => { });
        return () => ac.abort();
    }, [lightboxPhoto?.id]);

    const fetchImages = async () => {
        try {
            const response = await fetch("/api/unsplash-images")
            const data = await response.json()

            if (response.ok) {
                setImageData(data.images)
            } else {
                setError(data.error || "Failed to fetch images")
            }
        } catch (err) {
            setError("Network error occurred while fetching images")
        } finally {
            setLoading(false)
        }
    };

    const handleFullscreen = (index: number) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (step: number) => {
        if (selectedImageIndex !== null) {
            const newIndex = (selectedImageIndex + step + imageData.length) % imageData.length;
            setSelectedImageIndex(newIndex);
        }
    };

    useEffect(() => {
        fetchImages()
    }, []);

    if (loading) {
        return null
    }

    if (error) {
        return (
            <div className="text-center py-8 text-zinc-400"><p>{error}</p></div>
        )
    }

    if (!imageData.length) {
        return (
            <div className="text-center py-8 text-zinc-400"><p>No images found.</p></div>
        )
    }

    const mergedExif = lightboxPhoto ? mergeExif(lightboxPhoto.exif, detailExif) : null;

    return (
        <div>
            <Masonry breakpointCols={{ default: 3, 768: 2, }} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {imageData.map((image, index) => (
                    <GalleryImageTile key={image.id} width={image.width} height={image.height} urls={image.urls} onClick={() => handleFullscreen(index)} />
                ))}
            </Masonry>
            {lightboxPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md" onClick={closeFullscreen} role="dialog" aria-modal="true" aria-label="Photo">
                    <div className="flex h-full max-h-dvh w-full max-w-[1400px] flex-col px-3 pb-4 pt-14 md:px-10" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex min-h-0 flex-1 items-center justify-center">
                            <img className="max-h-[min(78vh,calc(100dvh-11rem))] max-w-full object-contain" src={lightboxPhoto.urls.regular} alt={lightboxPhoto.caption || 'Gallery photo'} />
                            <button type="button" className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-zinc-200 md:text-3xl" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} aria-label="Previous photo"><MdNavigateBefore /></button>
                            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-2xl text-zinc-200 md:text-3xl" onClick={(e) => { e.stopPropagation(); navigateImage(1); }} aria-label="Next photo"><MdNavigateNext /></button>
                            <button type="button" className="absolute right-2 top-2 cursor-pointer text-2xl text-zinc-200 md:text-3xl" onClick={(e) => { e.stopPropagation(); closeFullscreen(); }} aria-label="Close"><MdOutlineClose /></button>
                        </div>
                        <GalleryLightboxSpecs width={lightboxPhoto.width} height={lightboxPhoto.height} exif={mergedExif} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;