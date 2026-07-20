import { images } from '../data/images'

export const ResourceCardGrid = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <p className="emptyPageMessage">Obsah bude doplněn.</p>
  }

  return (
    <div className="BoxProKarty">
      {cards.map((card, index) => (
        <a
          key={`${card.image}-${index}`}
          href={card.url}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="obrazekKarty"
            src={images[card.image]}
            alt={card.alt || card.image}
          />
        </a>
      ))}
    </div>
  )
}
