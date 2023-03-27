import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({menu}: {menu: Item[]}) {
  return (
    <main className="bg-white mt-5">
    <div>
      <div className="mt-4 pb-1 mb-1">
        <h1 className="font-bold text-4xl">Menu</h1>
      </div>
      {menu.length ? (
      <div className="flex flex-wrap justify-between">
        {menu.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      ) : (
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">No Menu</h1>
          </div>
      )}
    </div>
  </main>
  )
}
