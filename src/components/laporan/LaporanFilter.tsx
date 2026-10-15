import { NAMA_BULAN } from "../../data/laporanDummy";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
type Props = {
  bulan: string; tahun: string; unitKerja: string;
  daftarUnit: {id: string; nama: string}[];
  onBulanChange: (value: string) => void; onTahunChange: (value: string) => void;
  onUnitKerjaChange: (value: string) => void; onReset: () => void;
};
export default function LaporanFilter({bulan, tahun, unitKerja, daftarUnit, onBulanChange, onTahunChange, onUnitKerjaChange, onReset}: Props) {
  return <Card><CardContent className="flex flex-wrap items-end gap-4 pt-6">
    <div className="w-full space-y-2 sm:w-44"><label className="text-sm font-medium">Bulan</label>
      <Select value={bulan} onValueChange={onBulanChange}><SelectTrigger><SelectValue placeholder="Pilih bulan" /></SelectTrigger><SelectContent>
        {NAMA_BULAN.map((nama, index) => <SelectItem key={nama} value={String(index + 1)}>{nama}</SelectItem>)}
      </SelectContent></Select>
    </div>
    <div className="w-full space-y-2 sm:w-32"><label className="text-sm font-medium">Tahun</label>
      <Select value={tahun} onValueChange={onTahunChange}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
        <SelectItem value="2025">2025</SelectItem><SelectItem value="2026">2026</SelectItem>
      </SelectContent></Select>
    </div>
    <div className="w-full space-y-2 sm:w-72"><label className="text-sm font-medium">Unit Kerja</label>
      <Select value={unitKerja} onValueChange={onUnitKerjaChange}><SelectTrigger><SelectValue placeholder="Pilih Unit Kerja" /></SelectTrigger><SelectContent>
        <SelectItem value="semua">Semua Unit Kerja</SelectItem>
        {daftarUnit.map(item => <SelectItem key={item.id} value={item.id}>{item.nama}</SelectItem>)}
      </SelectContent></Select>
    </div>
    <Button variant="secondary" onClick={onReset}>Reset Filter</Button>
  </CardContent></Card>;
}
