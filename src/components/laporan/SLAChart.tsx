import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TARGET_SLA, type DataUnitKerja } from "../../data/laporanDummy";
import { angka, capaianSLA, persen, type StatistikLaporan } from "../../lib/laporanUtils";
const config = {capaian: {label: "Capaian SLA", color: "#6366f1"}, target: {label: "Target SLA", color: "#f59e0b"}} satisfies ChartConfig;
export function SLASummary({statistik, data}: {statistik: StatistikLaporan; data: DataUnitKerja[]}) {
  const mencapai = data.filter(item => capaianSLA(item) >= TARGET_SLA).length;
  return <Card><CardHeader><CardTitle>Ringkasan SLA</CardTitle><CardDescription>Target SLA minimum {TARGET_SLA}%.</CardDescription></CardHeader>
    <CardContent className="space-y-6"><div><p className="text-sm text-muted-foreground">Capaian SLA keseluruhan</p><p className="mt-2 text-4xl font-bold">{persen(statistik.sla)}</p>
      <Badge variant={statistik.sla >= TARGET_SLA ? "default" : "destructive"} className="mt-3">{statistik.sla >= TARGET_SLA ? "Mencapai SLA" : "Belum Mencapai SLA"}</Badge></div>
      <div className="grid grid-cols-2 gap-4 border-t pt-5"><div><p className="text-sm text-muted-foreground">Unit Mencapai SLA</p><p className="text-2xl font-semibold">{mencapai}</p></div><div><p className="text-sm text-muted-foreground">Unit Belum Mencapai</p><p className="text-2xl font-semibold">{data.length - mencapai}</p></div></div>
    </CardContent></Card>;
}
export default function SLAChart({data}: {data: DataUnitKerja[]}) {
  const chartData = data.map(item => ({nama: item.nama, capaian: Number(capaianSLA(item).toFixed(1)), target: TARGET_SLA}));
  return <Card><CardHeader><CardTitle>Capaian SLA Seluruh Unit Kerja</CardTitle><CardDescription>Perbandingan capaian SLA dengan target {TARGET_SLA}%.</CardDescription></CardHeader>
    <CardContent className="space-y-6"><div className="overflow-x-auto"><ChartContainer config={config} className="h-[350px] min-w-[900px] w-full"><BarChart accessibilityLayer data={chartData}><CartesianGrid vertical={false} />
      <XAxis dataKey="nama" tickLine={false} axisLine={false} tick={{fontSize: 10}} angle={-35} textAnchor="end" height={110} interval={0} /><YAxis domain={[0,100]} />
      <ChartTooltip content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      <Bar dataKey="capaian" fill="var(--color-capaian)" radius={[4,4,0,0]} /><Bar dataKey="target" fill="var(--color-target)" radius={[4,4,0,0]} />
    </BarChart></ChartContainer></div>
    <div className="max-h-[450px] overflow-auto rounded-md border"><Table><TableHeader><TableRow><TableHead>Unit Kerja</TableHead><TableHead className="text-right">Total Layanan</TableHead><TableHead className="text-right">Sesuai SLA</TableHead><TableHead className="text-right">Capaian</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>
      {data.map(item => {const capaian = capaianSLA(item); return <TableRow key={item.id}><TableCell>{item.nama}</TableCell><TableCell className="text-right">{angka(item.totalLayanan)}</TableCell><TableCell className="text-right">{angka(item.totalSesuaiSLA)}</TableCell><TableCell className="text-right">{persen(capaian)}</TableCell><TableCell><Badge variant={capaian >= TARGET_SLA ? "default" : "destructive"}>{capaian >= TARGET_SLA ? "Tercapai" : "Belum Tercapai"}</Badge></TableCell></TableRow>;})}
    </TableBody></Table></div>
    </CardContent></Card>;
}
