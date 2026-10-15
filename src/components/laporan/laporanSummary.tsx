import { CalendarDays, CheckCircle2, XCircle, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { angka, persen, type StatistikLaporan } from "../../lib/laporanUtils";
type Item = {title: string; value: string; description: string; icon: LucideIcon};
export default function LaporanSummary({statistik, jumlahUnit}: {statistik: StatistikLaporan; jumlahUnit: number}) {
  const items: Item[] = [
    {title: "Total Booking Online", value: angka(statistik.jumlahBooking), description: "Booking pada periode terpilih", icon: CalendarDays},
    {title: "Booking Dilayani", value: angka(statistik.dilayani), description: `${persen(statistik.tingkatDilayani)} dari total booking`, icon: CheckCircle2},
    {title: "Booking Tidak Dilayani", value: angka(statistik.tidakDilayani), description: "Booking yang tidak dilayani", icon: XCircle},
    {title: "Total Layanan", value: angka(statistik.jumlahLayanan), description: `${jumlahUnit} Unit Kerja terpantau`, icon: Users},
  ];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map(item => {
    const Icon = item.icon;
    return <Card key={item.title}><CardContent className="flex items-start justify-between gap-3 pt-6">
      <div className="space-y-2"><p className="text-sm text-muted-foreground">{item.title}</p><p className="text-2xl font-bold tracking-tight">{item.value}</p><p className="text-xs text-muted-foreground">{item.description}</p></div>
      <div className="rounded-lg bg-muted p-3"><Icon className="h-5 w-5 text-primary" /></div>
    </CardContent></Card>;
  })}</div>;
}
