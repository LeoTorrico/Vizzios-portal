import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatDecimalToHHMM } from "./formatUtils";

export const downloadWeeklyExcel = (data: any) => {
  // Filas principales
  const rows = data.desglose.map((dia: any) => ({
    Fecha: dia.fecha,
    Día: dia.diaSemana,
    Entrada: dia.entrada || "--",
    Salida: dia.salida || "--",
    Horas: formatDecimalToHHMM(dia.horas),
    Estado: dia.incompleto ? "INCOMPLETO" : "OK",
  }));

  // Fila de totales
  rows.push({});
  rows.push({
    Fecha: "TOTAL SEMANA",
    Horas: formatDecimalToHHMM(data.summary.totalHoras),
    Estado: `Prom. Diario: ${formatDecimalToHHMM(data.summary.promedioDiario)}`,
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Ajustar ancho de columnas
  const wscols = [
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
  ];
  worksheet["!cols"] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Semanal");

  const fileName = `Reporte_${data.employee.carnet}_${data.week.startDate}.xlsx`;
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};

export const downloadMonthlyExcel = (data: any) => {
  const rows = data.branches.map((sucursal: any) => ({
    Sucursal: sucursal.branchName,
    "Total Horas": sucursal.totalHoras,
    "Empleados Activos": sucursal.empleadosActivos,
    "Promedio/Emp": sucursal.promedioPorEmpleado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const wscols = [{ wch: 25 }, { wch: 15 }, { wch: 18 }, { wch: 15 }];
  worksheet["!cols"] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen Mensual");

  // Hoja 2: Top Empleados
  const topRows: any[] = [];
  data.branches.forEach((b: any) => {
    b.topEmpleados.forEach((e: any) => {
      topRows.push({
        Sucursal: b.branchName,
        Carnet: e.carnet,
        Nombre: e.nombre,
        Horas: e.horas,
      });
    });
  });

  if (topRows.length > 0) {
    const wsTop = XLSX.utils.json_to_sheet(topRows);
    wsTop["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(workbook, wsTop, "Detalle Empleados");
  }

  const fileName = `Mensual_${data.period.monthName}_${data.period.year}.xlsx`;
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
