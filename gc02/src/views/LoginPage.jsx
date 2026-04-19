import axios from "axios"
import Toastify from "toastify-js"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import baseUrl from "../helpers/baseUrl"

export default function LoginPage() {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem("access_token")
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  if (accessToken) {
    return <Navigate to="/cms/cuisines" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setLoading(true)
      const { data } = await axios.post(`${baseUrl}/login`, form)
      localStorage.setItem("access_token", data.access_token)

      Toastify({
        text: "Login success",
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

  return (
    <section className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#fde68a_0%,#93c5fd_100%)] px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border-2 border-slate-900 bg-white shadow-[10px_10px_0px_rgba(15,23,42,1)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-slate-900 p-8 text-white md:p-10">
          <p className="mb-4 inline-flex rounded-full border-2 border-white/70 px-4 py-1 text-sm font-bold uppercase tracking-[0.25em]">
            CMS Login
          </p>
          <h1 className="text-4xl font-black leading-tight">Masuk ke dashboard dan kelola semua menu di satu tempat.</h1>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none"
                placeholder="admin@mail.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none"
                placeholder="masukkan password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl border-2 border-slate-900 bg-amber-400 px-4 py-3 text-lg font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login CMS"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
