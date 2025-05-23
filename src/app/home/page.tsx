"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Authcontext";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import AvailableProducts from "../components/AvailableProducts";
import RestockedSection from "../components/RestockedSection";
import Footer from "../components/Footer";
import { Product } from "../lib/types/Product";

export default function HomePage() {
  const { isLoggedIn, userData } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]); // ✅ Tambahkan ini

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const availableProducts = products.filter(p => p.stock > 0);
  const restockedProducts = products.filter(p => p.stock === 0);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <AvailableProducts products={availableProducts} />
      <RestockedSection products={restockedProducts} />
      <Footer />
    </>
  );
}
