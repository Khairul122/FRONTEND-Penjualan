"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import CustomTable from "@/components/tableUser";
import { daftarUser } from "@/config/daftarUser";
import { useToast } from "@chakra-ui/react";

interface User {
  id: number;
  nama_user: string;
  email: string;
  password: string;
}

const DaftarUser: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost/backend-penjualan/UserAPI.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUsers();
  }, [toast]);

  return (
    <div className="w-full">
      <CustomTable
        data={users}
        columns={daftarUser.columns}
        title="Daftar User"
        addTitle="+ Tambah User"
        isAddPage
      />
    </div>
  );
};

export default DaftarUser;
