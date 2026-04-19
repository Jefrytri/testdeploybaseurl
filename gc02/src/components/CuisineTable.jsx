export default function CuisineTable({ cuisines, categoryMap, onDelete, onEdit, onUpload, startIndex = 0 }) {
  function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0)
  }

  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-slate-900 shadow-[8px_8px_0px_rgba(15,23,42,1)]">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-amber-300 text-left">
            <tr>
              <th className="border-b-2 border-slate-900 px-4 py-4">No</th>
              <th className="border-b-2 border-slate-900 px-4 py-4">Menu</th>
              <th className="border-b-2 border-slate-900 px-4 py-4">Price</th>
              <th className="border-b-2 border-slate-900 px-4 py-4">Category</th>
              <th className="border-b-2 border-slate-900 px-4 py-4">Author</th>
              <th className="border-b-2 border-slate-900 px-4 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cuisines.map((cuisine, index) => (
              <tr key={cuisine.id} className="align-top">
                <td className="border-b border-slate-200 px-4 py-4 font-semibold">{startIndex + index + 1}</td>
                <td className="border-b border-slate-200 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cuisine.imgUrl}
                      alt={cuisine.name}
                      className="h-16 w-16 rounded-2xl border-2 border-slate-900 object-cover"
                    />
                    <div>
                      <p className="font-bold">{cuisine.name}</p>
                      <p className="max-w-xs text-sm text-slate-600">{cuisine.description}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-200 px-4 py-4">{formatRupiah(cuisine.price)}</td>
                <td className="border-b border-slate-200 px-4 py-4">
                  {categoryMap[cuisine.CategoryId] || `Category ${cuisine.CategoryId}`}
                </td>
                <td className="border-b border-slate-200 px-4 py-4">{cuisine.User?.username || "-"}</td>
                <td className="border-b border-slate-200 px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border-2 border-slate-900 bg-sky-400 px-4 py-2 text-sm font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
                      onClick={() => onEdit(cuisine.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl border-2 border-slate-900 bg-amber-400 px-4 py-2 text-sm font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
                      onClick={() => onUpload(cuisine.id)}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl border-2 border-slate-900 bg-rose-400 px-4 py-2 text-sm font-semibold shadow-[4px_4px_0px_rgba(15,23,42,1)]"
                      onClick={() => onDelete(cuisine.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
