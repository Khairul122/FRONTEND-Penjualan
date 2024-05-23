"use client";

import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/Input';
import CustomButton from '@/components/button';
import { useToast } from '@chakra-ui/react';

const API_URL = "http://localhost/backend-penjualan/ProdukAPI.php"; // URL endpoint API Anda

const validationSchema = Yup.object({
  nama_produk: Yup.string().required('Nama Produk is required'),
  merk_produk: Yup.string().required('Merk is required'),
  harga: Yup.number().required('Harga is required'),
  stok: Yup.number()
    .required('Stok is required')
    .min(0, 'Stok must be a positive number'),
});

const EditProduk: NextPage = () => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id_produk'); // Mengambil id dari URL
  const toast = useToast();

  useEffect(() => {
    if (id) {
      console.log(`Fetching product with ID: ${id}`); // Tambahkan log ID
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${API_URL}?id_produk=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          console.log('Product data fetched:', data); // Tambahkan log data
          setProduct(data[0]); // Mengasumsikan API mengembalikan array dengan satu produk
        } catch (error) {
          console.error('Error fetching product:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch product',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };

      fetchProduct();
    }
  }, [id, toast]);

  if (!product) {
    return <div className="capitalize">Produk tidak ditemukan</div>;
  }

  const handleSubmit = async (values: typeof product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_produk: id,
          nama_produk: values.nama_produk,
          merk_produk: values.merk_produk,
          harga: values.harga,
          stok: values.stok,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      console.log('Update response:', data); // Log balasan ketika data berhasil di update
      toast({
        title: 'Success',
        description: 'Product has been updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/admin/daftar-produk');
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full p-4">
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" size="lg" mb={4} textTransform={'capitalize'}>
          Edit Produk
        </Heading>
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Pastikan form diinisialisasi ulang ketika data produk diambil
        >
          {({ errors, touched }) => (
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

export default EditProduk;
