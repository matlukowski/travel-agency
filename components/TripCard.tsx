import { Link } from "react-router";
import { useLocation } from "react-router";

interface TripCardProps {
  trip: {
    id: number;
    name: string;
    imageUrls: string[];
    itinerary: { location: string }[];
    tags: string[];
    travelStyle: string;
    estimatedPrice: string;
  };
}

const TripCard = ({ trip }: TripCardProps) => {
  const { id, name, imageUrls, itinerary, tags, estimatedPrice } = trip;
  const location = useLocation();
  
  const getTripUrl = () => {
    if (location.pathname === "/" || location.pathname.startsWith("/travel")) {
      return `/travel/${id}`;
    }
    return `/trips/${id}`;
  };
  
  return (
    <Link to={getTripUrl()} className="trip-card block hover:shadow-lg transition-shadow duration-200">
      <img
        src={imageUrls[0]}
        alt={name}
        className="w-full h-[160px] rounded-t-xl object-cover aspect-video"
      />
      <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5 pb-4">
        <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-2">
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
          />
          <figcaption className="text-xs md:text-sm font-normal text-gray-100">
            {itinerary[0]?.location}
          </figcaption>
        </figure>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="bg-light-100 text-xs px-2 py-1 rounded-full text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-dark-100">
            {estimatedPrice}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default TripCard;
