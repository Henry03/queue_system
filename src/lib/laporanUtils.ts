import { JENIS_LAYANAN, NAMA_BULAN, type DataUnitKerja } from "../data/laporanDummy";
export const angka = (value: number) => new Intl.NumberFormat("id-ID", {maximumFractionDigits: 1}).format(value);
export const persen = (value: number) => `${angka(value)}%`;
export type NumericKey = "totalAntrean" | "bookingDilayani" | "bookingTidakDilayani" | "totalSesuaiSLA" | "totalLayanan" | "surveyBaik" | "surveyBuruk";
export const total = (data: DataUnitKerja[], key: NumericKey) => data.reduce((sum, item) => sum + item[key], 0);
export const rataAntrean = (item: DataUnitKerja) => item.hariOperasional > 0 ? item.totalAntrean / item.hariOperasional : 0;
export const capaianSLA = (item: DataUnitKerja) => item.totalLayanan > 0 ? (item.totalSesuaiSLA / item.totalLayanan) * 100 : 0;
export type StatistikLaporan = {
  dilayani: number; tidakDilayani: number; jumlahBooking: number; jumlahLayanan: number;
  sesuaiSLA: number; baik: number; buruk: number; sla: number; tingkatDilayani: number;
};
export function hitungStatistik(data: DataUnitKerja[]): StatistikLaporan {
  const dilayani = total(data, "bookingDilayani");
  const tidakDilayani = total(data, "bookingTidakDilayani");
  const jumlahBooking = dilayani + tidakDilayani;
  const jumlahLayanan = total(data, "totalLayanan");
  const sesuaiSLA = total(data, "totalSesuaiSLA");
  return {
    dilayani, tidakDilayani, jumlahBooking, jumlahLayanan, sesuaiSLA,
    baik: total(data, "surveyBaik"), buruk: total(data, "surveyBuruk"),
    sla: jumlahLayanan ? (sesuaiSLA / jumlahLayanan) * 100 : 0,
    tingkatDilayani: jumlahBooking ? (dilayani / jumlahBooking) * 100 : 0,
  };
}
export function exportCSV(data: DataUnitKerja[], bulan: string, tahun: string) {
  const headers = ["Unit Kerja", "Tahun", "Bulan", "Total Antrean", "Rata-rata Antrean Harian", "Booking Dilayani", "Booking Tidak Dilayani", "Total Layanan", "Capaian SLA (%)", ...JENIS_LAYANAN, "Survey Baik", "Survey Buruk"];
  const rows = data.map(item => [item.nama, item.tahun, NAMA_BULAN[item.bulan - 1], item.totalAntrean, rataAntrean(item).toFixed(2), item.bookingDilayani, item.bookingTidakDilayani, item.totalLayanan, capaianSLA(item).toFixed(2), ...JENIS_LAYANAN.map(jenis => item.layanan[jenis]), item.surveyBaik, item.surveyBuruk]);
  const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF", csv], {type: "text/csv;charset=utf-8;"}));
  const link = document.createElement("a");
  link.href = url; link.download = `laporan-antrean-${tahun}-${bulan.padStart(2, "0")}.csv`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
