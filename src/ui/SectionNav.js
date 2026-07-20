import { Link } from 'react-router-dom'

export const SectionNav = ({ links }) => {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="BoxProOdkazy">
      {links.map((link) => (
        <Link key={link.to} className="sectionButtonLink" to={link.to}>
          <h3 className="sectionButton">{link.label}</h3>
        </Link>
      ))}
    </div>
  )
}
