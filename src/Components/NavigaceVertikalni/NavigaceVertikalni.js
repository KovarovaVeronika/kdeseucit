import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { verticalNav } from '../../data/navigation'
import './NavigaceVertikalni.css'

const getOpenMenusForPath = (pathname) => {
  const openMenus = new Set()

  verticalNav.forEach((item) => {
    if (!item.children) {
      return
    }

    if (pathname === item.to || item.children.some((child) => child.to === pathname)) {
      openMenus.add(item.to)
    }
  })

  return openMenus
}

export const NavigaceVertikalni = () => {
  const { pathname } = useLocation()
  const [openMenus, setOpenMenus] = useState(() => getOpenMenusForPath(pathname))

  useEffect(() => {
    setOpenMenus((current) => {
      const next = new Set(current)
      getOpenMenusForPath(pathname).forEach((menu) => next.add(menu))
      return next
    })
  }, [pathname])

  const toggleMenu = (to) => {
    setOpenMenus((current) => {
      const next = new Set(current)
      if (next.has(to)) {
        next.delete(to)
      } else {
        next.add(to)
      }
      return next
    })
  }

  return (
    <nav className="NavigaceVertikalniKontejner">
      {verticalNav.map((item) => (
        <div key={item.to} className="verNavItem">
          {item.children ? (
            <>
              <button
                type="button"
                className={`verButton verButtonParent ${openMenus.has(item.to) ? 'verButtonOpen' : ''}`}
                onClick={() => toggleMenu(item.to)}
                aria-expanded={openMenus.has(item.to)}
              >
                {item.label}
              </button>
              {openMenus.has(item.to) && (
                <div className="verSubMenu">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      className={`verSubButton ${pathname === child.to ? 'verSubButtonActive' : ''}`}
                      to={child.to}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              className={`verButton ${pathname === item.to ? 'verButtonActive' : ''}`}
              to={item.to}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
