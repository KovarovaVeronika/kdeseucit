import { Link } from 'react-router-dom'
import { horizontalNav } from '../../data/navigation'
import './NavigaceHorizontalni.css'

export const NavigaceHorizontalni = () => {
  return (
    <div className="horizontalniNavigaceKontejner">
      {horizontalNav.map((item) => (
        <Link key={item.to} className="navButton" to={item.to}>
          {item.prefix ? (
            <>
              {item.prefix}&nbsp;
              <span className="navButtonClassText">{item.classText}</span>
            </>
          ) : (
            item.label
          )}
        </Link>
      ))}
    </div>
  )
}
