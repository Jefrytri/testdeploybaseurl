import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Loader from "../components/Loader"
import baseUrl from "../helpers/baseUrl"

const defaultForm = {
  name: "",
  description: "",
  price: "",
  imgUrl: "",
  CategoryId: "",
}

export default function CuisineFormPage({ mode }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState(defaultForm)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  function authHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)

      const payload = {
        ...form,
        price: Number(form.price),
        CategoryId: Number(form.CategoryId),
      }

      if (mode === "create") {
        await axios.post(`${baseUrl}/cuisines`, payload, { headers: authHeaders() })
      } else {
        await axios.put(`${baseUrl}/cuisines/${id}`, payload, { headers: authHeaders() })
      }

      Toastify({
        text: mode === "create" ? "Menu berhasil ditambahkan" : "Menu berhasil diupdate",
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

      navigate("/cms/cuisines")
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

  useEffect(() => {
    async function bootstrap() {
      try {
        setPageLoading(true)

        const categoryResponse = await axios.get(`${baseUrl}/categories`, { headers: authHeaders() })
        setCategories(categoryResponse.data.data || categoryResponse.data)

        if (mode === "edit") {
          const cuisineResponse = await axios.get(`${baseUrl}/cuisines/${id}`, { headers: authHeaders() })
          const cuisine = cuisineResponse.data.data || cuisineResponse.data

          setForm({
            name: cuisine.name || "",
            description: cuisine.description || "",
            price: cuisine.price || "",
            imgUrl: cuisine.imgUrl || "",
            CategoryId: cuisine.CategoryId || "",
          })
        }
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
        setPageLoading(false)
      }
    }

    bootstrap()
  }, [id, mode])

  if (pageLoading) {
    return <Loader text="Lagi siapkan form menu..." />
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border-2 border-slate-900 bg-amber-200 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-700">
          {mode === "create" ? "Create" : "Edit"} Cuisine
        </p>
        <h2 className="text-3xl font-black">
          {mode === "create" ? "Tambah menu baru" : "Edit detail menu"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-[28px] border-2 border-slate-900 bg-rose-100 p-5 shadow-[8px_8px_0px_rgba(15,23,42,1)] md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">Menu Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div>
          <label className="mb-2 block font-bold">Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div>
          <label className="mb-2 block font-bold">Category</label>
          <select name="CategoryId" value={form.CategoryId} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">Image URL</label>
          <input type="text" name="imgUrl" value={form.imgUrl} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="6" className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-2 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]" disabled={loading}>
            {loading ? "Submitting..." : mode === "create" ? "Create Menu" : "Update Menu"}
          </button>
        </div>
      </form>
    </section>
  )
}
