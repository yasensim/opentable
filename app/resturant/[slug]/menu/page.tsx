import ResturantNavBar from "../components/ResturantNavBar";
import Menu from "../components/Menu";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

    
    const fetchResturantMenu = async (slug: string) => {
      const resturant = await prisma.restaurant.findUnique({
        where: {
          slug,
        },
        select: {
            items: true
        }
      })
      if(!resturant) throw new Error('Resturant not found');
      return resturant.items;
    }

export default async function ResturantMenu({params}: {params: {slug: string}}) {
      const menu = await fetchResturantMenu(params.slug);
      console.log({ menu });
return (
<>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <ResturantNavBar slug={params.slug} />
       <Menu menu={menu}/>
      </div>
</>

)
}