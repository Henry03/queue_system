import { useMemo, useState } from "react";
import { Activity, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { laporanDummy } from "../data/laporanDummy";
import { exportCSV, hitungStatistik } from "../lib/laporanUtils";
import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanSummary from "../components/laporan/laporanSummary";
import BookingChart from "../components/laporan/bookingChart";
import AntreanRankingChart from "../components/laporan/AntreanRankingChart";
import SLAChart, { SLASummary } from "../components/laporan/SLAChart";
import LayananChart from "../components/laporan/LayananChart";
import SurveyChart from "../components/laporan/SurveyChart";
export default function Laporan() {
  const [bulan, setBulan] = useState("10");
  const [tahun, setTahun] = useState("2026");
  const [unitKerja, setUnitKerja] = useState("semua");
  const daftarUnit = useMemo(() => [...new Map(laporanDummy.map(item => [item.id, {id: item.id, nama: item.nama}])).values()], []);
  const data = useMemo(() => laporanDummy.filter(item => item.bulan === Number(bulan) && item.tahun === Number(tahun) && (unitKerja === "semua" || item.id === unitKerja)), [bulan, tahun, unitKerja]);
  const statistik = useMemo(() => hitungStatistik(data), [data]);
  const reset = () => {setBulan("10"); setTahun("2026"); setUnitKerja("semua");};
  return <div className="min-h-screen bg-background p-4 md:p-8"><div className="mx-auto max-w-7xl space-y-6">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h1 className="text-3xl font-bold tracking-tight">Laporan Antrean</h1><p className="mt-1 text-muted-foreground">Monitoring antrean, pelayanan, SLA, dan survei seluruh Unit Kerja.</p></div>
      <Button variant="outline" onClick={() => exportCSV(data, bulan, tahun)}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
    </div>
    <LaporanFilter bulan={bulan} tahun={tahun} unitKerja={unitKerja} daftarUnit={daftarUnit} onBulanChange={setBulan} onTahunChange={setTahun} onUnitKerjaChange={setUnitKerja} onReset={reset} />
    <LaporanSummary statistik={statistik} jumlahUnit={data.length} />
    <div className="grid gap-4 lg:grid-cols-2"><BookingChart statistik={statistik} /><SLASummary statistik={statistik} data={data} /></div>
    <AntreanRankingChart data={data} />
    <SLAChart data={data} />
    <LayananChart data={data} />
    <SurveyChart data={data} statistik={statistik} />
    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Activity className="h-4 w-4" /><span>Seluruh angka merupakan dummy data untuk pengembangan aplikasi.</span></div>
  </div></div>;
}
