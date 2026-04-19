import axios from "axios"
import Toastify from "toastify-js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Loader from "../components/Loader"
import baseUrl from "../helpers/baseUrl"

export default function CuisineUploadPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [cuisine, setCuisine] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  function authHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!imageFile) {
      Toastify({
        text: "Pilih file gambar dulu ya.",
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
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", imageFile)

      await axios.patch(`${baseUrl}/cuisines/${id}`, formData, {
        headers: authHeaders(),
      })

      Toastify({
        text: "Image berhasil diupload",
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
    async function fetchCuisine() {
      try {
        setPageLoading(true)
        const { data } = await axios.get(`${baseUrl}/cuisines/${id}`, { headers: authHeaders() })
        setCuisine(data.data || data)
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

    fetchCuisine()
  }, [id])

  if (pageLoading || !cuisine) {
    return <Loader text="Lagi ambil data menu untuk upload..." />
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border-2 border-slate-900 bg-sky-200 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-700">Upload Image</p>
        <h2 className="text-3xl font-black">{cuisine.name}</h2>
      </div>

      <div className="grid gap-6 rounded-[28px] border-2 border-slate-900 bg-white p-5 shadow-[8px_8px_0px_rgba(15,23,42,1)] lg:grid-cols-[0.8fr_1fr]">
        <img src={cuisine.imgUrl} alt={cuisine.name} className="h-80 w-full rounded-[28px] border-2 border-slate-900 object-cover" />

        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-5">
          <div>
            <label className="mb-2 block font-bold">Select New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files[0])}
              className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)]"
            />
          </div>

          <button type="submit" className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-2 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </section>
  )
}
