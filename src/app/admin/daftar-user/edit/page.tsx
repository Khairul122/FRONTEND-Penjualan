"use client";
import { NextPage } from "next";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/button";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  nama_user: string;
  email: string;
  password: string;
  alamat: string;
  nomor_telp: string;
}

const validationSchema = Yup.object({
  nama_user: Yup.string().required("Nama User is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  alamat: Yup.string().required("Alamat is required"),
  nomor_telp: Yup.string().required("Nomor Telepon is required"),
});

const EditUser: NextPage = () => {
  const searchParams = useSearchParams();
  const id_user = searchParams.get("id_user");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Mengambil data user dari backend
    const fetchUser = async () => {
      if (!id_user) return;

      try {
        console.log(`Fetching user data for id_user: ${id_user}`);
        const response = await fetch(
          `http://localhost/backend-penjualan/UserAPI.php?id_user=${id_user}`
        );
        const data = await response.json();
        console.log("Fetched user data:", data); // Log data yang diambil
        if (data && data.length > 0) {
          setUser(data[0]); // Mengasumsikan API mengembalikan array user dan kita memerlukan yang pertama
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [id_user]);

  if (user === null) {
    return <div className="capitalize">User Tidak Ditemukan</div>;
  }

  const handleSubmit = async (values: User) => {
    try {
      console.log("Submitting user data:", values);
      const response = await fetch(
        "http://localhost/backend-penjualan/UserAPI.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_user: user.id,
            nama_user: values.nama_user,
            email: values.email,
            password: values.password,
            alamat: values.alamat,
            nomor_telp: values.nomor_telp,
            level: 2, // Menambahkan kolom level dengan nilai 2
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.message) {
        console.log("Update successful:", data.message); // Log respons dari backend
        toast.success("User updated successfully");
      } else {
        console.error("Update failed:", data.error); // Log pesan error dari backend
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="w-full p-4">
      <ToastContainer />
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" size="lg" mb={4} textTransform={"capitalize"}>
          Edit User
        </Heading>
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Memastikan form diinisialisasi ulang ketika data user diambil
        >
          {({ errors, touched }) => (
            <Form>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Field
                  as={CustomInput}
                  id="nama_user"
                  name="nama_user"
                  title="Nama User"
                  isInvalid={touched.nama_user && !!errors.nama_user}
                  errorMessage={errors.nama_user}
                />
                <Field
                  as={CustomInput}
                  id="email"
                  name="email"
                  title="Email"
                  type="email"
                  isInvalid={touched.email && !!errors.email}
                  errorMessage={errors.email}
                />
                <Field
                  as={CustomInput}
                  id="password"
                  name="password"
                  title="Password"
                  type="password"
                  isInvalid={touched.password && !!errors.password}
                  errorMessage={errors.password}
                />
                <Field
                  as={CustomInput}
                  id="alamat"
                  name="alamat"
                  title="Alamat"
                  isInvalid={touched.alamat && !!errors.alamat}
                  errorMessage={errors.alamat}
                />
                <Field
                  as={CustomInput}
                  id="nomor_telp"
                  name="nomor_telp"
                  title="Nomor Telepon"
                  isInvalid={touched.nomor_telp && !!errors.nomor_telp}
                  errorMessage={errors.nomor_telp}
                />
              </SimpleGrid>

              <div className="w-full flex justify-end mt-4">
                <CustomButton type="submit" size="md">
                  Simpan
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default EditUser;
