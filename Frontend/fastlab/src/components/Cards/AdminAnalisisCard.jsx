import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import iconResults from '../../assets/icon-results.png';
export default function AdminAnalisisCard({ id, title, type, date }) {
  return (
    <Link
      to={`/admin/resultados/lista-de-resultados/detalle/${id}`}
      className="flex items-center gap-2 px-3 py-1 text-sm text-teal-600
         hover:text-teal-700"
    >
      <div className="w-full p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
        <div className="flex justify-evenly items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-[40px] h-[40px] overflow-hidden rounded-[50%]">
              <img src={iconResults} alt="Icon" className="w-full" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{title}</h3>

            <div className="flex justify-start gap-4 items-start">
              <p className="text-sm text-gray-600">Paciente: {type}</p>
              <div className="flex gap-2 text-sm text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Ingresado {date}</span>
              </div>
            </div>
          </div>
          <div className="w-[150px] flex justify-center items-center">
            <p>Ver resultado</p>
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  );
}
