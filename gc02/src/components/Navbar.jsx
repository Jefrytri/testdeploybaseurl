import { Link } from "react-router"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-slate-900 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-black tracking-tight text-slate-900">
          Mie<span className="text-orange-500">Gacoin</span> Hub
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-2xl border-2 border-slate-900 bg-amber-300 px-4 py-2 font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
          >
            Public Site
          </Link>
          <Link
            to="/cms/login"
            className="rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-2 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]"
          >
            CMS Login
          </Link>
        </div>
      </div>
    </header>
  )
}
