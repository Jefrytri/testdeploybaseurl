export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <div className="rounded-3xl border-2 border-slate-900 bg-amber-200 px-6 py-4 text-lg font-semibold shadow-[6px_6px_0px_rgba(15,23,42,1)]">
        {text}
      </div>
    </div>
  )
}
