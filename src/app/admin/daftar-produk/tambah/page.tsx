"use client";
import React, { useState, useEffect } from "react";
import { Box, Heading, SimpleGrid, Textarea } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/button";
import useCustomToast from "@/components/toast";

const validationSchema = Yup.object({
  nama_produk: Yup.string().required("Nama Produk is required"),
  merk_produk: Yup.string().required("Merk is required"),
  harga_produk: Yup.number()
    .required("Harga is required")
    .positive("Harga must be a positive number"),
  stok_produk: Yup.number()
    .required("Stok is required")
    .min(0, "Stok cannot be negative"),
  deskripsi_produk: Yup.string().required("Deskripsi Produk is required"),
});

const TambahProduk: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];
  const showToast = useCustomToast();

  const initialValues = {
    nama_produk: "",
    merk_produk: "",
    harga_produk: "",
    deskripsi_produk: "",
    stok_produk: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("handleSubmit called", values);
    showToast({
      title: "Submitting...",
      description: "Your product is being submitted.",
      status: "info",
    });

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        try {
          const response = await fetch(
            "http://localhost/backend-penjualan/ProdukAPI.php",
            {
              method: "POST",
              body: JSON.stringify({
                nama_produk: values.nama_produk,
                merk_produk: values.merk_produk,
                harga_produk: values.harga_produk,
                deskripsi_produk: values.deskripsi_produk,
                stok_produk: values.stok_produk,
                gambar_produk: reader.result,
              }),
              headers: {
                "Content-Type": "application/json",
              },
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
            console.log(
              "Error:",
              data.error || "An error occurred while adding the product."
            );
            showToast({
              title: "Error",
              description:
                data.error || "An error occurred while adding the product.",
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
    } else {
      try {
        const response = await fetch(
          "http://localhost/backend-penjualan/ProdukAPI.php",
          {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
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
          console.log(
            "Error:",
            data.error || "An error occurred while adding the product."
          );
          showToast({
            title: "Error",
            description:
              data.error || "An error occurred while adding the product.",
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
                  id="harga_produk"
                  name="harga_produk"
                  title="Harga"
                  type="number"
                  isInvalid={touched.harga_produk && !!errors.harga_produk}
                  errorMessage={errors.harga_produk}
                />
                <Field
                  as={CustomInput}
                  id="stok_produk"
                  name="stok_produk"
                  title="Stok"
                  type="number"
                  isInvalid={touched.stok_produk && !!errors.stok_produk}
                  errorMessage={errors.stok_produk}
                />
                <Field
                  as={Textarea}
                  id="deskripsi_produk"
                  name="deskripsi_produk"
                  title="Deskripsi Produk"
                  isInvalid={
                    touched.deskripsi_produk && !!errors.deskripsi_produk
                  }
                  errorMessage={errors.deskripsi_produk}
                />
                <div className="w-full">
                  <label htmlFor="gambar_produk" className="block mb-2">
                    Gambar Produk
                  </label>
                  <input
                    id="gambar_produk"
                    name="gambar_produk"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </SimpleGrid>
              <div className="w-full flex justify-end mt-4">
                <CustomButton type="submit" size="md" isDisabled={!isValid || isSubmitting}>
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
