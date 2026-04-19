export default function Pagination({ page, totalPage, onPageChange }) {
  if (!totalPage || totalPage <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1)

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="rounded-2xl border-2 border-slate-900 bg-white px-4 py-2 font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {pages.map((item) => (
        <button
          key={item}
          type="button"
          className={`h-11 w-11 rounded-2xl border-2 border-slate-900 font-bold shadow-[4px_4px_0px_rgba(15,23,42,1)] ${
            item === page ? "bg-sky-400" : "bg-white"
          }`}
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      ))}

      <button
        type="button"
        className="rounded-2xl border-2 border-slate-900 bg-white px-4 py-2 font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={page === totalPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}
