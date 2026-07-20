import { Link } from 'react-router-dom'
import { verticalNav } from '../../data/navigation'
import './NavigaceVertikalni.css'

export const NavigaceVertikalni = () => {
  return (
    <div className="NavigaceVertikalniKontejner">
      {verticalNav.map((item) => (
        <Link key={item.to} className="verButton" to={item.to}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}
