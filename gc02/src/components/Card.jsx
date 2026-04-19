import { Link } from "react-router"

export default function Card({ cuisine }) {
  function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0)
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-slate-900 bg-amber-300 shadow-[8px_8px_0px_rgba(15,23,42,1)]">
      <img
        src={cuisine.imgUrl}
        alt={cuisine.name}
        className="h-52 w-full border-b-2 border-slate-900 object-cover"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black">{cuisine.name}</h3>
          <span className="rounded-full border-2 border-slate-900 bg-white px-3 py-1 text-sm font-bold">
            {formatRupiah(cuisine.price)}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-700">{cuisine.description}</p>

        <div className="mt-auto pt-2">
          <Link
            to={`/cuisines/${cuisine.id}`}
            className="inline-flex rounded-2xl border-2 border-slate-900 bg-white px-4 py-2 font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  )
}
