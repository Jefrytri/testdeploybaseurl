import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import Loader from "../components/Loader"
import Pagination from "../components/Pagination"
import baseUrl from "../helpers/baseUrl"

export default function HomePage() {
  const [cuisines, setCuisines] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("createdAt")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)

  console.log({baseUrl})

  useEffect(() => {
    async function fetchCuisines() {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://gacoin.databarang.my.id/pub/cuisines`, {
          params: { search, sort, page, limit: 8 },
        })
        setCuisines(data.data)
        setTotalPage(data.pagination?.totalPage || 1)
      } catch (error) {
        Toastify({
          text: error?.response?.data?.message || "Terjadi error, coba lagi ya.",
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#F87171",
            color: "#111827",
            border: "2px solid #111827",
            boxShadow: "4px 4px 0px rgba(17,24,39,1)",
          },
        }).showToast()
      } finally {
        setLoading(false)
      }
    }

    fetchCuisines()
  }, [page, search, sort])

  return (
    <section className="space-y-8">
      <div className="grid gap-6 rounded-[32px] border-2 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_rgba(15,23,42,1)] lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="mb-3 inline-flex rounded-full border-2 border-slate-900 bg-rose-200 px-4 py-1 text-sm font-bold uppercase tracking-[0.2em]">
            Public Site
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Cari menu favorit dan lihat detailnya.
          </h1>
        </div>

        <div className="rounded-[28px] border-2 border-slate-900 bg-amber-300 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)]">
          <label className="mb-2 block font-bold">Search Menu</label>
          <input
            type="text"
            placeholder="Cari mie, bakmi, kuah..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            className="mb-4 w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none"
          />

          <label className="mb-2 block font-bold">Sort By</label>
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value)
              setPage(1)
            }}
            className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none"
          >
            <option value="createdAt">Latest</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Lagi ambil daftar menu..." />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cuisines.map((cuisine) => (
              <Card key={cuisine.id} cuisine={cuisine} />
            ))}
          </div>

          <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
        </>
      )}
    </section>
  )
}
