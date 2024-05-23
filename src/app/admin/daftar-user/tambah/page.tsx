"use client";
import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/button";
import useCustomToast from "@/components/toast";

const validationSchema = Yup.object({
  namaUser: Yup.string().required("Nama User is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  alamat: Yup.string().required("Alamat is required"), // Added validation for alamat
  nomor_telp: Yup.string().required("Nomor Telepon is required"), // Added validation for nomor_telp
});

const TambahUser: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];
  const showToast = useCustomToast();

  const initialValues = {
    namaUser: "",
    email: "",
    password: "",
    alamat: "", // Added alamat to initialValues
    nomor_telp: "", // Added nomor_telp to initialValues
  };

  const handleSubmit = async (values: typeof initialValues) => {
    showToast({
      title: "Submitting...",
      description: "Your user is being submitted.",
      status: "info",
    });

    try {
      const response = await fetch(
        "http://localhost/backend-penjualan/UserAPI.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            nama_user: values.namaUser,
            nomor_telp: values.nomor_telp,
            alamat: values.alamat,
            level: 2, // Set level to 2 for regular users
            register: true,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showToast({
          title: "Success",
          description: "User has been added successfully.",
          status: "success",
        });
        return router.replace(`/admin/daftar-user`);
      } else {
        showToast({
          title: "Error",
          description: data.error || "An error occurred while adding the user.",
          status: "error",
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "An error occurred while adding the user.",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full p-4">
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" size="lg" mb={4} textTransform={"capitalize"}>
          tambah user
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Field
                  as={CustomInput}
                  id="namaUser"
                  name="namaUser"
                  title="Nama User"
                  isInvalid={touched.namaUser && !!errors.namaUser}
                  errorMessage={errors.namaUser}
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
                  type="text"
                  isInvalid={touched.alamat && !!errors.alamat}
                  errorMessage={errors.alamat}
                />
                <Field
                  as={CustomInput}
                  id="nomor_telp"
                  name="nomor_telp"
                  title="Nomor Telepon"
                  type="text"
                  isInvalid={touched.nomor_telp && !!errors.nomor_telp}
                  errorMessage={errors.nomor_telp}
                />
              </SimpleGrid>
              <div className="w-full flex justify-end mt-4">
                <CustomButton type="submit" size="md">
                  Tambah User
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default TambahUser;
