import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { JENIS_LAYANAN, type DataUnitKerja } from "../../data/laporanDummy";
import { angka } from "../../lib/laporanUtils";
const config = {Teller: {label: "Teller", color: "#2563eb"}, "Customer Service": {label: "Customer Service", color: "#0d9488"}, "Pembukaan Rekening": {label: "Pembukaan Rekening", color: "#f59e0b"}, Pengaduan: {label: "Pengaduan", color: "#a855f7"}} satisfies ChartConfig;
export default function LayananChart({data}: {data: DataUnitKerja[]}) {
  const chartData = data.map(item => ({nama: item.nama, ...item.layanan}));
  return <Card><CardHeader><CardTitle>Rekapitulasi Jenis Layanan</CardTitle><CardDescription>Jumlah layanan berdasarkan jenisnya di setiap Unit Kerja.</CardDescription></CardHeader>
    <CardContent className="space-y-6"><div className="overflow-x-auto"><ChartContainer config={config} className="h-[400px] min-w-[1000px] w-full"><BarChart accessibilityLayer data={chartData}><CartesianGrid vertical={false} />
      <XAxis dataKey="nama" angle={-35} textAnchor="end" height={110} interval={0} tick={{fontSize: 10}} /><YAxis /><ChartTooltip content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} />
      {JENIS_LAYANAN.map(jenis => <Bar key={jenis} dataKey={jenis} stackId="layanan" fill={config[jenis].color} />)}
    </BarChart></ChartContainer></div>
    <div className="overflow-x-auto rounded-md border"><Table><TableHeader><TableRow><TableHead>Unit Kerja</TableHead>{JENIS_LAYANAN.map(jenis => <TableHead key={jenis} className="text-right">{jenis}</TableHead>)}<TableHead className="text-right">Total</TableHead></TableRow></TableHeader><TableBody>
      {data.map(item => <TableRow key={item.id}><TableCell>{item.nama}</TableCell>{JENIS_LAYANAN.map(jenis => <TableCell key={jenis} className="text-right">{angka(item.layanan[jenis])}</TableCell>)}<TableCell className="text-right font-semibold">{angka(item.totalLayanan)}</TableCell></TableRow>)}
    </TableBody></Table></div>
    </CardContent></Card>;
}
