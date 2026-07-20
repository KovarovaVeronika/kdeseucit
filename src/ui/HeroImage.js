import { images } from '../data/images'

export const HeroImage = ({ image, alt }) => {
  return (
    <div className="heroImageContainer">
      <img className="hlavniPic" src={images[image]} alt={alt || image} />
    </div>
  )
}
