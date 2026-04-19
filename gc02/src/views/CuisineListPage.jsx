import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import CuisineTable from "../components/CuisineTable"
import Loader from "../components/Loader"
import Pagination from "../components/Pagination"
import baseUrl from "../helpers/baseUrl"

export default function CuisineListPage() {
  const navigate = useNavigate()
  const [cuisines, setCuisines] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const limit = 10

  function authHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${baseUrl}/cuisines/${id}`, { headers: authHeaders() })

      Toastify({
        text: "Menu berhasil dihapus",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#34D399",
          color: "#111827",
          border: "2px solid #111827",
          boxShadow: "4px 4px 0px rgba(17,24,39,1)",
        },
      }).showToast()

      const [cuisineResponse, categoryResponse] = await Promise.all([
        axios.get(`${baseUrl}/cuisines`, { headers: authHeaders() }),
        axios.get(`${baseUrl}/categories`, { headers: authHeaders() }),
      ])

      setCuisines(cuisineResponse.data.data || [])
      setCategories(categoryResponse.data.data || [])
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
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [cuisineResponse, categoryResponse] = await Promise.all([
          axios.get(`${baseUrl}/cuisines`, { headers: authHeaders() }),
          axios.get(`${baseUrl}/categories`, { headers: authHeaders() }),
        ])

        setCuisines(cuisineResponse.data.data || [])
        setCategories(categoryResponse.data.data || [])
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

    fetchData()
  }, [])

  const filteredCuisines = cuisines.filter((cuisine) =>
    cuisine.name.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedCuisines = filteredCuisines.slice((page - 1) * limit, page * limit)
  const categoryMap = categories.reduce((accumulator, category) => {
    accumulator[category.id] = category.name
    return accumulator
  }, {})

  useEffect(() => {
    const nextTotalPage = Math.max(1, Math.ceil(filteredCuisines.length / limit))
    setTotalPage(nextTotalPage)

    if (page > nextTotalPage) {
      setPage(1)
    }
  }, [filteredCuisines.length, page])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border-2 border-slate-900 bg-sky-100 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">Main Entity</p>
          <h2 className="text-3xl font-black">List Cuisines</h2>
        </div>

        <div className="w-full max-w-md">
          <label className="mb-2 block font-bold">Search Menu</label>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
              setPage(1)
            }}
            className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none"
            placeholder="Cari berdasarkan nama menu..."
          />
        </div>
      </div>

      {loading ? (
        <Loader text="Lagi ambil data CMS..." />
      ) : (
        <>
          <CuisineTable
            cuisines={paginatedCuisines}
            categoryMap={categoryMap}
            onDelete={handleDelete}
            onEdit={(id) => navigate(`/cms/cuisines/${id}/edit`)}
            onUpload={(id) => navigate(`/cms/cuisines/${id}/upload`)}
            startIndex={(page - 1) * limit}
          />
          <Pagination page={page} totalPage={totalPage} onPageChange={setPage} />
        </>
      )}
    </section>
  )
}
