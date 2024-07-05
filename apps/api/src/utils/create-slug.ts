export function createSlug(text: string): string {
  let slug = text.normalize('NFD')

  slug = slug.replace(/[\u0300-\u036f]/g, '')

  slug = slug.replace(/[^\w\s-]/g, '')

  slug = slug.replace(/\s+/g, '-')

  slug = slug.toLowerCase()

  slug = slug.replace(/[^a-z0-9-]/g, '')

  slug = slug.replace(/^-+|-+$/g, '')

  return slug
}
