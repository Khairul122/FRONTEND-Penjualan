"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import CustomTable from "@/components/tableProduk";
import { daftarProduk } from "@/config/daftarProduk";
import { useToast } from "@chakra-ui/react";

const API_URL = "http://localhost/backend-penjualan/ProdukAPI.php";
const BASE_IMAGE_URL = "http://localhost/backend-penjualan/gambar/";

interface Product {
  id_produk: number;
  nama_produk: string;
  merk_produk: string;
  harga: number;
  stok: number;
  gambar_produk: string; // Tambahkan properti ini
  nomor_urut?: number; // Nomor urut untuk penampilan
}

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: Product[] = await response.json();

      // Mengubah gambar_produk menjadi URL lengkap dan log ID serta nama file
      const modifiedData = data.map(product => {
        const fileName = product.gambar_produk.split('/').pop();
        const fullImageUrl = `${BASE_IMAGE_URL}${fileName}`;
        console.log(`ID: ${product.id_produk}, Gambar: ${fileName}`);
        return { ...product, gambar_produk: fullImageUrl };
      });

      // Mengurutkan data berdasarkan id_produk secara ascending
      modifiedData.sort((a, b) => a.id_produk - b.id_produk);

      // Menambahkan nomor urut
      const numberedData = modifiedData.map((product, index) => ({
        ...product,
        nomor_urut: index + 1,
      }));

      setProducts(numberedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_produk: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      toast({
        title: "Success",
        description: "Product has been deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full">
      <CustomTable
        data={products}
        columns={daftarProduk.columns}
        title="Daftar Produk"
        addTitle="+ Tambah Produk"
        isAddPage
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
