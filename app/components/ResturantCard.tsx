import Link from "next/link"
import { ResturantCardType } from "../page"
import Price from "./Price";
import Reviews from "../resturant/[slug]/components/Reviews";
import Stars from "./Stars";

interface Props {
  resturant: ResturantCardType;
}

function ResturantCard({resturant}: Props) {
  return (
    <div
    className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
  >
    <Link href={`/resturant/${resturant.slug}`}>
   
    <img
      src={resturant.main_image}
      alt=""
      className="w-full h-36"
    />
    <div className="p-1">
      <h3 className="font-bold text-2xl mb-2">{resturant.name}</h3>
      <div className="flex items-start">
        <div className="flex mb-2">
          <Stars reviews={resturant.reviews}/>
        </div>
        <p className="ml-2">{resturant.reviews.length} review{resturant.reviews.length === 1 ? "" : "s"}</p>
      </div>
      <div className="flex text-reg font-light capitalize">
        <p className=" mr-3">{resturant.cuisine.name}</p>
        <Price price={resturant.price}/>
        <p>{resturant.location.name}</p>
      </div>
      <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
    </div>
    </Link>
  </div>
  )
}

export default ResturantCard