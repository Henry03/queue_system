import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { angka, type StatistikLaporan } from "../../lib/laporanUtils";
const config = {dilayani: {label: "Dilayani", color: "#16a34a"}, tidakDilayani: {label: "Tidak Dilayani", color: "#ef4444"}} satisfies ChartConfig;
export default function BookingChart({statistik}: {statistik: StatistikLaporan}) {
  const chartData = [{name: "Dilayani", value: statistik.dilayani, fill: "#16a34a"}, {name: "Tidak Dilayani", value: statistik.tidakDilayani, fill: "#ef4444"}];
  return <Card><CardHeader><CardTitle>Status Booking Online</CardTitle><CardDescription>Perbandingan booking berhasil dilayani dan tidak dilayani.</CardDescription></CardHeader>
    <CardContent><ChartContainer config={config} className="mx-auto h-[300px] w-full"><PieChart><ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} strokeWidth={3}>
        {chartData.map(item => <Cell key={item.name} fill={item.fill} />)}
      </Pie></PieChart></ChartContainer>
      <div className="flex flex-wrap justify-center gap-6 text-sm"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-green-600" />Dilayani: {angka(statistik.dilayani)}</span><span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-500" />Tidak: {angka(statistik.tidakDilayani)}</span></div>
    </CardContent></Card>;
}
