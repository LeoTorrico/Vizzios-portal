// src/components/DashboardPagination.tsx
interface DashboardPaginationProps {
  meta: {
    page: number;
    lastPage: number;
    total: number;
    limit: number;
  };
  onNext: () => void;
  onPrev: () => void;
  onGoToPage: (page: number) => void;
}

export default function DashboardPagination({
  meta,
  onNext,
  onPrev,
  onGoToPage,
}: DashboardPaginationProps) {
  const { page, lastPage, total, limit } = meta;

  const startRecord = (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, total);

  // Generar array de páginas visibles
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con ellipsis
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(lastPage);
      } else if (page >= lastPage - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = lastPage - 3; i <= lastPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push("...");
        pages.push(lastPage);
      }
    }

    return pages;
  };

  if (lastPage <= 1) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Info de registros */}
        <div className="text-sm text-gray-600">
          Mostrando{" "}
          <span className="font-semibold text-gray-900">{startRecord}</span> a{" "}
          <span className="font-semibold text-gray-900">{endRecord}</span> de{" "}
          <span className="font-semibold text-gray-900">{total}</span> registros
        </div>

        {/* Controles de paginación */}
        <div className="flex items-center space-x-2">
          {/* Botón Anterior */}
          <button
            onClick={onPrev}
            disabled={page === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Números de página */}
          <div className="hidden sm:flex items-center space-x-1">
            {getVisiblePages().map((pageNum, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNum === "number" ? onGoToPage(pageNum) : null
                }
                disabled={pageNum === "..."}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  pageNum === page
                    ? "bg-gradient-to-r from-[#036133] to-[#036133]/90 text-white"
                    : pageNum === "..."
                      ? "text-gray-400 cursor-default"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Indicador móvil */}
          <div className="sm:hidden px-4 py-2 text-sm font-medium text-gray-700">
            {page} / {lastPage}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={onNext}
            disabled={page === lastPage}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
