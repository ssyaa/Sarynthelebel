"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "../utils/axios";

export default function BelumLogin() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                // Cek apakah pengguna sudah login
                const response = await axios.get("/user");
                if (response.status === 200) {
                    router.push("/user"); // Jika sudah login, arahkan ke halaman user
                }
            } catch (error) {
                setError("Silakan login terlebih dahulu.");
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, [router]);

    if (loading) return <div>Loading...</div>; // Tampilkan loading saat pengecekan login
    return (
        <div
            className="relative flex min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/beranda.jpg')" }}
        >
            {/* Overlay blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

            {/* Layout kotak kiri dan kanan */}
            <div className="relative z-10 flex flex-1">
                {/* Kotak kiri */}
                <div className="w-1/2 flex items-center justify-center bg-white/40 backdrop-blur-md text-white p-8">
                    <h1 className="text-3xl font-semibold text-center tracking-widest">
                        Choose ur style <br />
                        with <span className="font-bold">@sarynthelebel</span>
                    </h1>
                </div>

                {/* Kotak kanan */}
                <div className="w-1/2 flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-lg p-10 h-[300px] w-[500px] text-center">
                        <img
                            src="/sarynlogo.png"
                            alt="Saryn Logo"
                            className="mx-auto mb-4 w-16 h-auto"
                        />
                        <h2 className="text-3xl font-bold mb-4 mt-4">Not logged in?</h2>
                        <p className="text-gray-700 mb-6 text-base">
                            Please log in first to access this page.
                        </p>
                        <Link href="/login">
                            <button className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
