import { pages } from './data/pages'

export const routes = Object.keys(pages).map((slug) => ({
  path: slug === 'home' ? '/' : `/${slug}`,
  slug,
}))
