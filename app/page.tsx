import { Inter } from 'next/font/google'

import Header from './components/Header'
import ResturantCard from './components/ResturantCard'
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client'

export interface ResturantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
  reviews: Review[];
}

const prisma = new PrismaClient()
const fetchResturants = async (): Promise<ResturantCardType[]> => {
  const resturants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,

    }
  })
  return resturants
}

export default async function Home() {
  const resturants = await fetchResturants();
  // console.log({ resturants });
  return ( 
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {resturants.map((resturant) => (
          <ResturantCard key={resturant.id} resturant={resturant} />
        ))}
      </div>
    </main>
  )
}
