"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/Authcontext";

export default function HomePageRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [user]);

  return null; // Tidak menampilkan apapun di halaman utama
}
