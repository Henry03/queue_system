export const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
export const JENIS_LAYANAN = ["Teller", "Customer Service", "Pembukaan Rekening", "Pengaduan"] as const;
export type JenisLayanan = (typeof JENIS_LAYANAN)[number];
export type DataUnitKerja = {
  id: string; nama: string; tahun: number; bulan: number; hariOperasional: number;
  totalAntrean: number; bookingDilayani: number; bookingTidakDilayani: number;
  totalSesuaiSLA: number; totalLayanan: number;
  layanan: Record<JenisLayanan, number>; surveyBaik: number; surveyBuruk: number;
};
export const TARGET_SLA = 90;
const NAMA_UNIT = [
  "KC Jakarta Pusat", "KC Jakarta Selatan", "KC Jakarta Barat", "KC Jakarta Timur", "KC Jakarta Utara",
  "KC Bandung", "KC Surabaya", "KC Semarang", "KC Yogyakarta", "KC Medan", "KC Makassar",
  "KC Denpasar", "KC Palembang", "KC Balikpapan", "KC Pontianak", "KC Malang", "KC Bogor",
  "KC Depok", "KC Tangerang", "KC Bekasi", "KCP Cibubur", "KCP Cikarang", "KCP BSD",
  "KCP Serpong", "KCP Tebet", "KCP Kemang", "KCP Kelapa Gading", "KCP Cempaka Putih",
  "KCP Antapani", "KCP Darmo",
];
export const laporanDummy: DataUnitKerja[] = [2025, 2026].flatMap(tahun =>
  Array.from({length: 12}, (_, bulanIndex) => {
    const bulan = bulanIndex + 1;
    return NAMA_UNIT.map((nama, index) => {
      const hariOperasional = 22;
      const rataHarian = 35 + index * 7 + ((bulan * 13 + index * 9) % 28);
      const totalAntrean = rataHarian * hariOperasional;
      const totalLayanan = Math.round(totalAntrean * 0.91);
      const bookingOnline = Math.round(totalAntrean * 0.42);
      const bookingDilayani = Math.round(bookingOnline * (0.78 + ((index + bulan) % 17) / 100));
      const bookingTidakDilayani = bookingOnline - bookingDilayani;
      const teller = Math.round(totalLayanan * 0.46);
      const customerService = Math.round(totalLayanan * 0.28);
      const pembukaanRekening = Math.round(totalLayanan * 0.16);
      const pengaduan = totalLayanan - teller - customerService - pembukaanRekening;
      const persentaseSLA = 0.82 + ((index * 3 + bulan * 2) % 17) / 100;
      const totalSesuaiSLA = Math.round(totalLayanan * persentaseSLA);
      const totalSurvey = Math.round(totalLayanan * 0.35);
      const surveyBuruk = Math.round(totalSurvey * (0.03 + ((index + bulan) % 10) / 100));
      return {
        id: `UK-${String(index + 1).padStart(3, "0")}`, nama, tahun, bulan,
        hariOperasional, totalAntrean, bookingDilayani, bookingTidakDilayani,
        totalSesuaiSLA, totalLayanan,
        layanan: {Teller: teller, "Customer Service": customerService, "Pembukaan Rekening": pembukaanRekening, Pengaduan: pengaduan},
        surveyBaik: totalSurvey - surveyBuruk, surveyBuruk,
      };
    });
  }).flat()
);
