import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,} from "../components/ui/alert-dialog";
import { APP_NAME} from "../config/App";

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "eric" && password === "eric") {
            navigate("/dashboard");
            return;
        }

        setShowError(true);
    };

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* kiri */}
                <section className="relative hidden overflow-hidden bg-primary lg:flex">
                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/10" />

                    <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-foreground/10" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-20">
                        
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground text-primary">
                                    <span className="text-xl font-bold">
                                        B
                                    </span>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-primary-foreground">{APP_NAME}</h1>

                                    <p className="text-sm text-primary-foreground/70">Layanan Antrian</p>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-lg">
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
                                selamat datang
                            </p>

                            <h2 className="text-4xl font-bold leading-tight text-primary-foreground xl:text-5xl">
                                Melayani dengan cepat,
                                <br />
                                nyaman, dan terpercaya.
                            </h2>

                            <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/70">
                                Kelola antrian nasabah dengan lebih mudah.
                            </p>
                        </div>

                        <div className="text-sm text-primary-foreground/60">
                            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                        </div>
                    </div>
                </section>

                {/* kanan */}
                <section className="flex min-h-screen items-center justify-center p-6 sm:p-10">
                    <Card className="w-full max-w-md border-0 shadow-none sm:border sm:shadow-sm">
                        <CardContent className="p-0 sm:p-8">

                            {/* Tampilan mobel */}
                            <div className="mb-10 text-center lg:hidden">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                    <span className="text-xl font-bold">
                                        B
                                    </span>
                                </div>

                                <h1 className="text-2xl font-bold">
                                    {APP_NAME}
                                </h1>

                                <p className="text-sm text-muted-foreground">
                                    Layanan Antrian
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Selamat Datang
                                </h2>

                                <p className="mt-2 text-muted-foreground">
                                    Silakan login untuk melanjutkan ke sistem.
                                </p>
                            </div>

                            <form
                                onSubmit={handleLogin}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="username">
                                        Username
                                    </Label>

                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Masukkan username"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            className="h-11 pl-10"
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        <button
                                            type="button"
                                            className="text-sm font-medium text-primary hover:underline"
                                            onClick={() =>
                                                console.log(
                                                    "Forgot password"
                                                )
                                            }
                                        >
                                            Lupa password?
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Masukkan password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="h-11 pl-10 pr-10"
                                            autoComplete="current-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            aria-label={
                                                showPassword
                                                    ? "Sembunyikan password"
                                                    : "Tampilkan password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <Button type="submit" className="h-11 w-full text-base font-semibold">
                                    Masuk
                                </Button>
                            </form>

                            <div className="mt-8 rounded-lg bg-muted/50 p-4">
                                <div className="flex gap-3">
                                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                                    <p className="text-xs leading-5 text-muted-foreground">
                                        Pastikan Anda menggunakan akun yang
                                        telah terdaftar. Jangan berikan
                                        username dan password kepada orang lain.
                                    </p>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-xs text-muted-foreground">
                                © {new Date().getFullYear()} {APP_NAME}
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>

            <AlertDialog open={showError} onOpenChange={setShowError}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Login Gagal
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Username atau password yang Anda masukkan salah.
                        Silakan periksa kembali credential Anda.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setShowError(false)}>
                        Mengerti
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </main>
    );
}
