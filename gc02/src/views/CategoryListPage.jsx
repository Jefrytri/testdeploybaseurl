import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import baseUrl from "../helpers/baseUrl"

export default function CategoryListPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  function authHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const { data } = await axios.get(`${baseUrl}/categories`, {
          headers: authHeaders(),
        })
        setCategories(data.data || data)
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

    fetchCategories()
  }, [])

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border-2 border-slate-900 bg-amber-200 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-700">Second Entity</p>
        <h2 className="text-3xl font-black">Categories List</h2>
      </div>

      {loading ? (
        <Loader text="Lagi ambil data categories..." />
      ) : (
        <div className="overflow-hidden rounded-[28px] border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)]">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-rose-200 text-left">
                <tr>
                  <th className="border-b-2 border-slate-900 px-4 py-4">ID</th>
                  <th className="border-b-2 border-slate-900 px-4 py-4">Category Name</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="border-b border-slate-200 px-4 py-4 font-semibold">{category.id}</td>
                    <td className="border-b border-slate-200 px-4 py-4">{category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
