import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export default function Queue() {
    const [now, setNow] = useState(new Date());

    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const rates = [
        { currency: "USD", buy: "17.800", sell: "17.900" },
        { currency: "EUR", buy: "20.650", sell: "20.850" },
        { currency: "SGD", buy: "13.850", sell: "13.950" },
        { currency: "AUD", buy: "12.100", sell: "12.250" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen flex-col gap-5 p-5">

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between">
                <div>
                    <div className="text-3xl font-bold">
                        Bank XYZ
                    </div>
                    <div>
                        Queue Management System
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="text-3xl font-bold">
                        {date}
                    </div>
                    <div className="text-3xl font-bold">
                        {time}
                    </div>
                </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-2 gap-5">
                <Card className="flex min-h-0 flex-col p-10">
                    <CardTitle className="shrink-0 text-center text-4xl font-bold">
                        Teller
                    </CardTitle>
                    <hr className="my-5" />
                    <CardContent className="flex min-h-0 flex-1 flex-col gap-5">
                        <p className="text-center text-xl text-muted-foreground">
                            Sedang dilayani
                        </p>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="text-[10rem] font-bold leading-none">
                                T-001
                            </div>
                        </div>
                        <hr />
                        <div className="shrink-0">
                            <p className="mb-5 text-center text-xl text-muted-foreground">
                                Antrian berikutnya
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-3xl font-bold">
                                {["T-002", "T-003", "T-004", "T-005"].map(
                                    (number) => (
                                        <div
                                            key={number}
                                            className="rounded-2xl bg-primary px-5 py-3 text-primary-foreground"
                                        >
                                            {number}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex min-h-0 flex-col p-10">
                    <CardTitle className="shrink-0 text-center text-4xl font-bold">
                        Customer Service
                    </CardTitle>
                    <hr className="my-5" />
                    <CardContent className="flex min-h-0 flex-1 flex-col gap-5">
                        <p className="text-center text-xl text-muted-foreground">
                            Sedang dilayani
                        </p>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="text-[10rem] font-bold leading-none">
                                CS-001
                            </div>
                        </div>
                        <hr />
                        <div className="shrink-0">
                            <p className="mb-5 text-center text-xl text-muted-foreground">
                                Antrian berikutnya
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-3xl font-bold">
                                {["CS-002", "CS-003", "CS-004"].map(
                                    (number) => (
                                        <div
                                            key={number}
                                            className="rounded-2xl bg-primary px-5 py-3 text-primary-foreground"
                                        >
                                            {number}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shrink-0">
                <CardTitle className="pt-5 text-center text-lg font-semibold">
                    Kurs Mata Uang
                </CardTitle>

                <CardContent className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
                    {rates.map((rate) => (
                        <div
                            key={rate.currency}
                            className="rounded-xl bg-muted px-4 py-3 text-center"
                        >
                            <p className="text-lg font-bold">
                                {rate.currency} / IDR
                            </p>
                            <div className="mt-1 flex justify-center gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">
                                        Beli
                                    </p>
                                    <p className="font-semibold">
                                        {rate.buy}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">
                                        Jual
                                    </p>
                                    <p className="font-semibold">
                                        {rate.sell}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}