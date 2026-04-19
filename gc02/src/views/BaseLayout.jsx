import Toastify from "toastify-js"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router"
import CmsSidebar from "../components/CmsSidebar"
import Navbar from "../components/Navbar"

export default function BaseLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isCmsPage = location.pathname.startsWith("/cms") && location.pathname !== "/cms/login"
  const accessToken = localStorage.getItem("access_token")

  function handleLogout() {
    localStorage.removeItem("access_token")

    Toastify({
      text: "Logout berhasil",
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

    navigate("/cms/login")
  }

  if (isCmsPage && !accessToken) {
    return <Navigate to="/cms/login" replace />
  }

  if (isCmsPage) {
    return (
      <div className="min-h-screen bg-[linear-gradient(135deg,#dbeafe_0%,#ffffff_40%,#fde68a_100%)] text-slate-900">
        <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <CmsSidebar onLogout={handleLogout} />
          <main className="rounded-[28px] border-2 border-slate-900 bg-white p-5 shadow-[8px_8px_0px_rgba(15,23,42,1)] md:p-7">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fef3c7_0%,#ffffff_26%,#dbeafe_100%)] text-slate-900">
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}
