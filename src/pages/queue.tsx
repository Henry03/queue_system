import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export default function Queue() {
    const [now, setNow] = useState(new Date());

    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    })

    const rates = [
        { currency: "USD", buy: "17.800", sell: "17.900" },
        { currency: "EUR", buy: "20.650", sell: "20.850" },
        { currency: "SGD", buy: "13.850", sell: "13.950" },
        { currency: "AUD", buy: "12.100", sell: "12.250" },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
        setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col gap-5 h-full">
            <div className="grid grid-cols-2 justify-between items-center gap-4">
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
                        {`${date}`}
                    </div>
                    <div className="text-3xl font-bold">
                        {`${time}`}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <Card className="w-full p-10">
                    <CardTitle className="text-4xl font-bold text-center">  
                        Teller
                    </CardTitle>
                    <hr/>
                    <CardContent className="flex flex-col gap-5">
                        <p className="text-xl text-center text-muted-foreground">
                            Sedang dilayani
                        </p>
                        <div className="text-9xl font-bold text-center">
                            T-001
                        </div>
                    </CardContent>
                    <hr/>
                    <CardContent className="flex flex-col gap-5">
                        <p className="text-xl text-center text-muted-foreground">
                            Antrian berikutnya
                        </p>
                        <div className="flex flex-row flex-wrap items-center gap-4 text-3xl font-bold text-center">
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                T-002
                            </div>
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                T-003
                            </div>
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                T-004
                            </div>
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                T-005
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full p-10">
                    <CardTitle className="text-4xl font-bold text-center">  
                        Customer Service
                    </CardTitle>
                    <hr/>
                    <CardContent className="flex flex-col gap-5">
                        <p className="text-xl text-center text-muted-foreground">
                            Sedang dilayani
                        </p>
                        <div className="text-9xl font-bold text-center">
                            CS-001
                        </div>
                    </CardContent>
                    <hr/>
                    <CardContent className="flex flex-col gap-5">
                        <p className="text-xl text-center text-muted-foreground">
                            Antrian berikutnya
                        </p>
                        <div className="flex flex-row flex-wrap items-center gap-4 text-3xl font-bold text-center">
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                CS-002
                            </div>
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                CS-003
                            </div>
                            <div className="rounded-2xl px-5 py-3 bg-primary text-primary-foreground">
                                CS-004
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-6 border-t pt-5">
                <CardTitle className="mb-4 text-center text-lg font-semibold">
                    Kurs Mata Uang
                </CardTitle>

                <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
    )
}