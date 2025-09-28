

export function getMediaUrl(path?: string | null): string | undefined {
  if (!path) return undefined
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}
