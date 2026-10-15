import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { DataUnitKerja } from "../../data/laporanDummy";
import { angka, type StatistikLaporan } from "../../lib/laporanUtils";
const config = {baik: {label: "Baik", color: "#16a34a"}, buruk: {label: "Buruk", color: "#ef4444"}} satisfies ChartConfig;
export default function SurveyChart({data, statistik}: {data: DataUnitKerja[]; statistik: StatistikLaporan}) {
  const chartData = [{name: "Baik", value: statistik.baik, fill: "#16a34a"}, {name: "Buruk", value: statistik.buruk, fill: "#ef4444"}];
  return <div className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle>Rekapitulasi Survei Layanan</CardTitle><CardDescription>Penilaian baik dan buruk dari seluruh Unit Kerja terpilih.</CardDescription></CardHeader>
    <CardContent><ChartContainer config={config} className="mx-auto h-[300px] w-full"><PieChart><ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={105}>{chartData.map(item => <Cell key={item.name} fill={item.fill} />)}</Pie>
    </PieChart></ChartContainer><div className="grid grid-cols-2 gap-4 text-center"><div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Survei Baik</p><p className="text-2xl font-bold text-green-600">{angka(statistik.baik)}</p></div><div className="rounded-lg bg-muted p-4"><p className="text-sm text-muted-foreground">Survei Buruk</p><p className="text-2xl font-bold text-red-500">{angka(statistik.buruk)}</p></div></div>
    </CardContent></Card>
    <Card><CardHeader><CardTitle>Survei per Unit Kerja</CardTitle><CardDescription>Detail jumlah penilaian baik dan buruk.</CardDescription></CardHeader><CardContent><div className="max-h-[440px] overflow-auto rounded-md border"><Table><TableHeader><TableRow><TableHead>Unit Kerja</TableHead><TableHead className="text-right">Baik</TableHead><TableHead className="text-right">Buruk</TableHead></TableRow></TableHeader><TableBody>
      {data.map(item => <TableRow key={item.id}><TableCell>{item.nama}</TableCell><TableCell className="text-right">{angka(item.surveyBaik)}</TableCell><TableCell className="text-right">{angka(item.surveyBuruk)}</TableCell></TableRow>)}
    </TableBody></Table></div></CardContent></Card>
  </div>;
}
