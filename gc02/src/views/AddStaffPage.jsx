import axios from "axios"
import Toastify from "toastify-js"
import { useState } from "react"
import { useNavigate } from "react-router"
import baseUrl from "../helpers/baseUrl"

export default function AddStaffPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)

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

      await axios.post(`${baseUrl}/addUser`, form, {
        headers: authHeaders(),
      })

      Toastify({
        text: "Succeed add new user",
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

      setForm({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      })

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
    <section className="space-y-6">
      <div className="rounded-[28px] border-2 border-slate-900 bg-rose-200 p-5 shadow-[6px_6px_0px_rgba(15,23,42,1)]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-700">Register Staff</p>
        <h2 className="text-3xl font-black">Tambah user staff baru</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-[28px] border-2 border-slate-900 bg-white p-5 shadow-[8px_8px_0px_rgba(15,23,42,1)] md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block font-bold">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div>
          <label className="mb-2 block font-bold">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div>
          <label className="mb-2 block font-bold">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div>
          <label className="mb-2 block font-bold">Phone Number</label>
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block font-bold">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows="5" className="w-full rounded-2xl border-2 border-slate-900 bg-white px-4 py-3 shadow-[4px_4px_0px_rgba(15,23,42,1)] outline-none" required />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-2 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Staff"}
          </button>
        </div>
      </form>
    </section>
  )
}
