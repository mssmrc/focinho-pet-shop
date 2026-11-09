/**
 * Imagens do site.
 * - ImgSlot: espaço reservado (usado quando a imagem ainda não existe).
 * - SafeImage: <img> que vira ImgSlot automaticamente se o arquivo não carregar.
 * - Photo: atalho que usa o nome da imagem em src/content/images.json.
 */
import { useEffect, useRef, useState } from 'react'
import { IMAGES, type ImageKey } from '~/content/images'

export function ImgSlot({
  label = 'Imagem',
  className = '',
  ariaLabel,
}: {
  label?: string
  className?: string
  ariaLabel?: string
}) {
  return (
    <div
      className={`img-slot ${className}`}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <span>{label}</span>
    </div>
  )
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Imagem',
  eager = false,
}: {
  src?: string
  alt: string
  className?: string
  fallbackLabel?: string
  eager?: boolean
}) {
  const [failed, setFailed] = useState(!src)
  const ref = useRef<HTMLImageElement>(null)
  // Se a imagem falhou antes do React hidratar, o onError não dispara: conferimos aqui.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  if (failed || !src)
    return <ImgSlot label={fallbackLabel} className={className} ariaLabel={alt || undefined} />
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`img-real ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export function Photo({
  k,
  className = '',
  eager = false,
}: {
  k: ImageKey
  className?: string
  eager?: boolean
}) {
  const img = IMAGES[k]
  return <SafeImage src={img.src} alt={img.alt} className={className} fallbackLabel={img.alt} eager={eager} />
}
