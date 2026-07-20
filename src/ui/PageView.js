import { Layout } from '../Screens/Layout/Layout'
import { pages } from '../data/pages'
import { HeroImage } from './HeroImage'
import { ResourceCardGrid } from './ResourceCardGrid'
import { SectionNav } from './SectionNav'

const renderPageContent = (page) => {
  switch (page.type) {
    case 'hero':
      return <HeroImage image={page.image} alt={page.alt} />
    case 'nav':
      return <SectionNav links={page.links} />
    case 'hybrid':
      return (
        <>
          <SectionNav links={page.headerLinks} />
          <ResourceCardGrid cards={page.cards} />
        </>
      )
    case 'resources':
      return <ResourceCardGrid cards={page.cards} />
    default:
      return <p className="emptyPageMessage">Obsah bude doplněn.</p>
  }
}

export const PageView = ({ slug }) => {
  const page = pages[slug]

  if (!page) {
    return (
      <Layout
        contentComponent={<p className="emptyPageMessage">Stránka nenalezena.</p>}
      />
    )
  }

  return <Layout contentComponent={renderPageContent(page)} />
}
