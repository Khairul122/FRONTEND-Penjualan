"use client";
import React, { useEffect } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/button";
import useCustomToast from "@/components/toast";

const validationSchema = Yup.object({
  nama_produk: Yup.string().required("Nama Produk is required"),
  merk_produk: Yup.string().required("Merk is required"),
  harga: Yup.number()
    .required("Harga is required")
    .positive("Harga must be a positive number"),
  stok: Yup.number()
    .required("Stok is required")
    .min(0, "Stok cannot be negative"),
});

const TambahProduk: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];
  const showToast = useCustomToast();

  const initialValues = {
    nama_produk: "",
    merk_produk: "",
    harga: "",
    stok: "",
  };

  const checkApiConnection = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend-penjualan/ProdukAPI.php",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        console.log("API connection successful");
      } else {
        console.log("API connection failed");
      }
    } catch (error) {
      console.error("Error connecting to API:", error);
    }
  };

  useEffect(() => {
    checkApiConnection();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("handleSubmit called", values);
    showToast({
      title: "Submitting...",
      description: "Your product is being submitted.",
      status: "info",
    });

    try {
      const response = await fetch(
        "http://localhost/backend-penjualan/ProdukAPI.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama_produk: values.nama_produk,
            merk_produk: values.merk_produk,
            harga: values.harga,
            stok: values.stok,
          }),
        }
      );

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Success: Product has been added successfully.");
        showToast({
          title: "Success",
          description: "Product has been added successfully.",
          status: "success",
        });
        router.replace(`/admin/${currentNav}`);
      } else {
        console.log("Error:", data.error || "An error occurred while adding the product.");
        showToast({
          title: "Error",
          description: data.error || "An error occurred while adding the product.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      showToast({
        title: "Error",
        description: "An error occurred while adding the product.",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full p-4">
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" size="lg" mb={4} textTransform={"capitalize"}>
          tambah produk
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, isSubmitting }) => (
            <Form>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Field
                  as={CustomInput}
                  id="nama_produk"
                  name="nama_produk"
                  title="Nama Produk"
                  isInvalid={touched.nama_produk && !!errors.nama_produk}
                  errorMessage={errors.nama_produk}
                />
                <Field
                  as={CustomInput}
                  id="merk_produk"
                  name="merk_produk"
                  title="Merk"
                  isInvalid={touched.merk_produk && !!errors.merk_produk}
                  errorMessage={errors.merk_produk}
                />
                <Field
                  as={CustomInput}
                  id="harga"
                  name="harga"
                  title="Harga"
                  type="number"
                  isInvalid={touched.harga && !!errors.harga}
                  errorMessage={errors.harga}
                />
                <Field
                  as={CustomInput}
                  id="stok"
                  name="stok"
                  title="Stok"
                  type="number"
                  isInvalid={touched.stok && !!errors.stok}
                  errorMessage={errors.stok}
                />
              </SimpleGrid>
              <div className="w-full flex justify-end mt-4">
                <CustomButton type="submit" size="md">
                  Tambah Produk
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default TambahProduk;
