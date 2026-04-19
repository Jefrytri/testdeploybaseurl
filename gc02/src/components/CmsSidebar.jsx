import { NavLink } from "react-router"

export default function CmsSidebar({ onLogout }) {
  function navClassName({ isActive }) {
    return `block rounded-2xl border-2 border-slate-900 px-4 py-3 font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)] ${
      isActive ? "bg-sky-400" : "bg-white"
    }`
  }

  return (
    <aside className="rounded-[28px] border-2 border-slate-900 bg-rose-200 p-5 shadow-[8px_8px_0px_rgba(15,23,42,1)]">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-700">CMS</p>
        <h1 className="text-3xl font-black leading-tight">Kitchen Control</h1>
      </div>

      <div className="space-y-3">
        <NavLink to="/cms/cuisines" className={navClassName}>
          List Menu
        </NavLink>
        <NavLink to="/cms/cuisines/new" className={navClassName}>
          Add Menu
        </NavLink>
        <NavLink to="/cms/categories" className={navClassName}>
          Categories
        </NavLink>
        <NavLink to="/cms/staff/new" className={navClassName}>
          Add Staff
        </NavLink>
      </div>

      <button
        type="button"
        className="mt-8 w-full rounded-2xl border-2 border-slate-900 bg-slate-900 px-4 py-3 font-semibold text-white shadow-[4px_4px_0px_rgba(15,23,42,1)]"
        onClick={onLogout}
      >
        Logout
      </button>
    </aside>
  )
}
