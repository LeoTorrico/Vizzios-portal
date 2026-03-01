import { useState, useEffect } from "react";
import type { Vacation } from "../api/vacationService";
import { vacationService } from "../api/vacationService";

interface VacationModalProps {
    employeeCarnet: string;
    employeeName: string;
    onClose: () => void;
}

export default function VacationModal({
    employeeCarnet,
    employeeName,
    onClose,
}: VacationModalProps) {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchVacations = async () => {
        setLoading(true);
        try {
            const data = await vacationService.findByEmployee(employeeCarnet);
            setVacations(data);
        } catch (err: any) {
            console.error(err);
            setError("Error al cargar las vacaciones.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVacations();
    }, [employeeCarnet]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError("Fechas de inicio y fin son obligatorias.");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setError("La fecha de inicio no puede ser mayor a la de fin.");
            return;
        }

        setIsSubmitting(true);
        setError("");
        try {
            await vacationService.create({
                employeeCarnet,
                startDate,
                endDate,
            });
            setStartDate("");
            setEndDate("");
            fetchVacations();
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.message || err.message || "Error al crear vacación."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta vacación?")) return;

        try {
            await vacationService.delete(id);
            fetchVacations();
        } catch (err: any) {
            console.error(err);
            setError("Error al eliminar la vacación.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#F7941F] to-[#036133] p-4 flex items-center justify-between text-white">
                    <h2 className="text-xl font-bold">
                        Vacaciones: {employeeName}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cuerpop del Modal */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Formulario Agregar */}
                    <form
                        onSubmit={handleCreate}
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6"
                    >
                        <h3 className="font-semibold text-gray-800 mb-3">Asignar Nuevas Vacaciones</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha Inicial <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#F7941F]/30 focus:border-[#F7941F] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha Final <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#F7941F]/30 focus:border-[#F7941F] outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#036133] hover:bg-[#024c28] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm active:scale-95 transition-all disabled:opacity-70 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Guardando...</span>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Asignar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Lista Historial */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">Historial de Vacaciones</h3>
                        </div>

                        {loading ? (
                            <div className="p-8 text-center text-gray-500">
                                <span className="animate-pulse inline-block">Cargando vacaciones...</span>
                            </div>
                        ) : vacations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>No hay vacaciones registradas.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {vacations.map((v) => (
                                    <li key={v.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {v.startDate} <span className="text-gray-400 font-normal mx-1">hasta</span> {v.endDate}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(v.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Eliminar vacación"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
