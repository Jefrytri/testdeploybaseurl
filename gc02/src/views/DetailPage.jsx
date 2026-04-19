import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import Loader from "../components/Loader"
import baseUrl from "../helpers/baseUrl"

export default function DetailPage() {
  const { id } = useParams()
  const [cuisine, setCuisine] = useState(null)
  const [loading, setLoading] = useState(false)

  function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0)
  }

  useEffect(() => {
    async function fetchCuisineDetail() {
      try {
        setLoading(true)
        const { data } = await axios.get(`${baseUrl}/pub/cuisines/${id}`)
        setCuisine(data.data)
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

    fetchCuisineDetail()
  }, [id])

  if (loading || !cuisine) {
    return <Loader text="Lagi ambil detail menu..." />
  }

  return (
    <section className="grid gap-6 rounded-[32px] border-2 border-slate-900 bg-white p-6 shadow-[8px_8px_0px_rgba(15,23,42,1)] lg:grid-cols-[1fr_0.9fr]">
      <img src={cuisine.imgUrl} alt={cuisine.name} className="h-full min-h-80 w-full rounded-[28px] border-2 border-slate-900 object-cover" />

      <div className="space-y-5">
        <div className="inline-flex rounded-full border-2 border-slate-900 bg-sky-300 px-4 py-1 text-sm font-bold uppercase tracking-[0.2em]">
          Detail Menu
        </div>
        <h1 className="text-4xl font-black">{cuisine.name}</h1>
        <p className="text-lg leading-8 text-slate-600">{cuisine.description}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border-2 border-slate-900 bg-amber-300 p-4 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">Price</p>
            <p className="mt-2 text-2xl font-black">{formatRupiah(cuisine.price)}</p>
          </div>
          <div className="rounded-[24px] border-2 border-slate-900 bg-rose-200 p-4 shadow-[4px_4px_0px_rgba(15,23,42,1)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">Category ID</p>
            <p className="mt-2 text-2xl font-black">{cuisine.CategoryId}</p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-2 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
