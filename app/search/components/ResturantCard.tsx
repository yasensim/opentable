import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { calcReviewRatingAverage } from "@/utils/CalcReviewRatingAverage";
import { PRICE, Cuisine, Location, Review } from "@prisma/client";
import Link from "next/link"

interface ResturantCardProps {
    id: number;
    location: Location;
    name: string;
    main_image: string;
    price: PRICE
    cuisine: Cuisine;
    slug: string;
    reviews: Review[];
}
function ResturantCard({resturant}: {resturant: ResturantCardProps}) {
  const renderRatingText = () => {
    const rating = calcReviewRatingAverage(resturant.reviews);
    if(rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 0) return "Average";
    else return "No reviews yet";
  }
  return (
    <div className="border-b flex pb-5 ml-4">
    <img
      src={resturant.main_image}
      alt=""
      className="w-44 h-36 rounded"
    />
    <div className="pl-5">
      <h2 className="text-3xl">{resturant.name}</h2>
      <div className="flex items-start">
        <div className="flex mb-2"><Stars reviews={resturant.reviews}/></div>
        <p className="ml-2 text-sm">{renderRatingText()}</p>
      </div>
      <div className="mb-9">
        <div className="font-light flex text-reg">
          <Price price={resturant.price}/>
          <p className="mr-4 capitalize">{resturant.cuisine.name}</p>
          <p className="mr-4 capitalize">{resturant.location.name}</p>
        </div>
      </div>
      <div className="text-red-600">
        <Link href={`/resturant/${resturant.slug}`}>View more information</Link>
      </div>
    </div>
  </div>
  )
}

export default ResturantCard