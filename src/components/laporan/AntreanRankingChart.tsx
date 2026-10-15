import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { DataUnitKerja } from "../../data/laporanDummy";
import { angka, rataAntrean } from "../../lib/laporanUtils";
const config = {rataHarian: {label: "Rata-rata per Hari", color: "#2563eb"}} satisfies ChartConfig;
function Ranking({data, jenis}: {data: DataUnitKerja[]; jenis: "tertinggi" | "terendah"}) {
  const ranking = [...data].sort((a,b) => jenis === "tertinggi" ? rataAntrean(b) - rataAntrean(a) : rataAntrean(a) - rataAntrean(b)).slice(0,20);
  const chartData = ranking.map(item => ({nama: item.nama, rataHarian: Number(rataAntrean(item).toFixed(1))}));
  const color = jenis === "tertinggi" ? "#2563eb" : "#0d9488";
  return <Card><CardHeader><CardTitle>20 Unit Kerja dengan Antrean {jenis === "tertinggi" ? "Tertinggi" : "Terendah"}</CardTitle><CardDescription>Berdasarkan rata-rata antrean harian pada bulan terpilih.</CardDescription></CardHeader>
    <CardContent className="space-y-6"><div className="overflow-x-auto"><ChartContainer config={config} className="h-[650px] min-w-[650px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{left: 8, right: 40}}><CartesianGrid horizontal={false} /><XAxis type="number" />
        <YAxis type="category" dataKey="nama" width={145} tick={{fontSize: 11}} interval={0} /><ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="rataHarian" fill={color} radius={[0,4,4,0]}><LabelList dataKey="rataHarian" position="right" fontSize={11} /></Bar>
      </BarChart></ChartContainer></div>
      <div className="max-h-[420px] overflow-auto rounded-md border"><Table><TableHeader><TableRow><TableHead>No.</TableHead><TableHead>Unit Kerja</TableHead><TableHead className="text-right">Total Antrean</TableHead><TableHead className="text-right">Rata-rata/Hari</TableHead></TableRow></TableHeader><TableBody>
        {ranking.map((item,index) => <TableRow key={item.id}><TableCell>{index+1}</TableCell><TableCell>{item.nama}</TableCell><TableCell className="text-right">{angka(item.totalAntrean)}</TableCell><TableCell className="text-right font-medium">{angka(rataAntrean(item))}</TableCell></TableRow>)}
        {ranking.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">Tidak ada data.</TableCell></TableRow>}
      </TableBody></Table></div>
    </CardContent></Card>;
}
export default function AntreanRankingChart({data}: {data: DataUnitKerja[]}) {
  return <Tabs defaultValue="tertinggi"><TabsList className="mb-4"><TabsTrigger value="tertinggi">Antrean Tertinggi</TabsTrigger><TabsTrigger value="terendah">Antrean Terendah</TabsTrigger></TabsList>
    <TabsContent value="tertinggi"><Ranking data={data} jenis="tertinggi" /></TabsContent><TabsContent value="terendah"><Ranking data={data} jenis="terendah" /></TabsContent>
  </Tabs>;
}
