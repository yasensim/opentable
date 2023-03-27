import Link from 'next/link'

function ResturantNavBar({slug}: {slug: string}) {
  return (
    <nav className="flex text-reg border-b pb-2">
    <Link href={`/resturant/${slug}`} className="mr-7">Overview</Link>
    <Link href={`/resturant/${slug}/menu`} className="mr-7">Menu</Link>
  </nav>
  )
}

export default ResturantNavBar