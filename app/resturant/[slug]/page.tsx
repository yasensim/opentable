import Header from "./components/Header";
import ResturantNavBar from "./components/ResturantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

interface ResturantType {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  reviews: Review[];
}

const fetchResturantBySlug = async (slug: string): Promise<ResturantType> => {
  const resturant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      reviews: true,
    }
  })
  if(!resturant) throw new Error('Resturant not found');
  return resturant;
}

export default async function RestaurantDetails({
  params,
}: {
  params: {slug: string};
}) {
  const resturant = await fetchResturantBySlug(params.slug);
  console.log({ resturant });
    return (
<>

      <div className="bg-white w-[70%] rounded p-3 shadow">
        <ResturantNavBar slug={resturant.slug}/>
        <Title name={resturant.name}/>
        <Rating reviews={resturant.reviews} />
        <Description description={resturant.description}/>
        <Images images={resturant.images}/>
        <Reviews reviews={resturant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
      <ReservationCard />
      </div>
</>



    )
}
