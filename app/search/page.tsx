import Header from "./components/Header";
import ResturantCard from "./components/ResturantCard";
import SearchSideBar from "./components/SearchSideBar";
import { PrismaClient, Location, PRICE } from "@prisma/client";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const fetchResturantsByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if(searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      }
    }
    where.location = location;
  }
  if(searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      }
    }
    where.cuisine = cuisine;
  }
  if(searchParams.price) {
    const price = {
      equals: searchParams.price,
    }
    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
}

const fetchLocations = () => {
  return prisma.location.findMany();
}

const fetchCuisines = () => {
  return prisma.cuisine.findMany();
}

export default async function Search({
  searchParams
}: {
    searchParams: SearchParams
  }) {
  const resturants = await fetchResturantsByCity(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  console.log({resturants});
    return (
    <>
          <Header />
          <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            <SearchSideBar 
              locations={locations}
              cuisines={cuisines}
              searchParams={searchParams}
            />
            <div className="w-5/6">
                {resturants.length ? (
                  <>
                  {resturants.map((resturant) => (
                    <ResturantCard key={resturant.id} resturant={resturant} />
                  ))}
                  </>
                ) : (
                  <p>No Resturants found in this area!</p>
                )}
            </div>
          </div>
    </>
       
    )
}
