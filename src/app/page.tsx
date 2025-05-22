"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Authcontext";

export default function HomePageRedirect() {
  const { userData } = useAuth(); // Ganti user menjadi userData
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [userData]);

  return null; // Tidak menampilkan apapun di halaman utama
}
