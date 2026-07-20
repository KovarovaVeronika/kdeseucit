import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const componentsDir = path.join(root, 'src/Components')
const pagesDir = path.join(root, 'src/data/pages')

const NAV_ONLY = new Set(['Predmety', 'Jazyky', 'Umelecke', 'Pohyb'])
const HERO = new Set(['Uvod'])
const HYBRID = new Set(['Devatatrida', 'Stredni'])

function componentNameToSlug(name) {
  if (name === 'Uvod') return 'home'
  return name.charAt(0).toLowerCase() + name.slice(1)
}

function parseImports(content) {
  const imports = {}
  const regex = /import\s+(\w+)\s+from\s+["']\.\.\/Pics\/(\w+)\.jpg["']/g
  let match
  while ((match = regex.exec(content)) !== null) {
    imports[match[1]] = match[2]
  }
  return imports
}

function parseLinks(content) {
  const links = []
  const regex =
    /<Link\s+className="sectionButtonLink"\s+to="([^"]+)">\s*<h3\s+className="sectionButton">([^<]+)<\/h3>\s*<\/Link>/g
  let match
  while ((match = regex.exec(content)) !== null) {
    links.push({ to: match[1], label: match[2] })
  }
  return links
}

function parseCards(content, imports) {
  const cards = []
  const anchorRegex =
    /<a\s+([^>]*?)href="([^"]+)"([^>]*?)>\s*<img\s+className="obrazekKarty"\s+src=\{(\w+)\}\s+alt="([^"]*)"\s*\/?>\s*<\/a>/gs

  let match
  while ((match = anchorRegex.exec(content)) !== null) {
    const varName = match[4]
    const imageKey = imports[varName]
    if (!imageKey) {
      console.warn(`Unknown image variable: ${varName}`)
      continue
    }
    cards.push({
      image: imageKey,
      url: match[2],
      alt: match[5] || imageKey,
    })
  }

  return cards
}

function formatPageData(data) {
  return `export default ${JSON.stringify(data, null, 2)}\n`
}

function extractComponent(filePath) {
  const name = path.basename(filePath, '.js')
  const content = fs.readFileSync(filePath, 'utf8')
  const slug = componentNameToSlug(name)
  const imports = parseImports(content)
  const links = parseLinks(content)
  const cards = parseCards(content, imports)

  if (HERO.has(name)) {
    return { slug, data: { type: 'hero', image: imports.hlavni || 'hlavni', alt: 'hlavni' } }
  }

  if (NAV_ONLY.has(name)) {
    return { slug, data: { type: 'nav', links } }
  }

  if (HYBRID.has(name)) {
    return {
      slug,
      data: {
        type: 'hybrid',
        headerLinks: links,
        cards,
      },
    }
  }

  if (cards.length > 0) {
    return { slug, data: { type: 'resources', cards } }
  }

  if (links.length > 0) {
    return { slug, data: { type: 'nav', links } }
  }

  console.warn(`Could not classify component: ${name}`)
  return null
}

fs.mkdirSync(pagesDir, { recursive: true })

const files = fs
  .readdirSync(componentsDir)
  .filter((f) => f.endsWith('.js') && !fs.statSync(path.join(componentsDir, f)).isDirectory())
  .map((f) => path.join(componentsDir, f))

const results = []
for (const file of files) {
  const result = extractComponent(file)
  if (result) {
    const outPath = path.join(pagesDir, `${result.slug}.js`)
    fs.writeFileSync(outPath, formatPageData(result.data))
    results.push(result)
    console.log(`Extracted ${result.slug} (${result.data.type})`)
  }
}

console.log(`\nDone: ${results.length} pages extracted`)
