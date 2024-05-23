"use client";
import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Flex,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import CustomButton from "./button";
import { usePathname, useRouter } from "next/navigation";

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
  title: string;
  addTitle?: string;
  itemsPerPage?: number;
  isAddPage?: boolean;
  isNoDefaultAction?: boolean;
  children?: any;
  onDelete?: (id: number) => void;
}

const CustomTable: React.FC<TableProps> = ({
  data,
  columns,
  addTitle,
  title,
  itemsPerPage = 5,
  isAddPage = false,
  isNoDefaultAction = false,
  children,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const router = useRouter();
  const pathname = usePathname();
  const currentNav = pathname?.split("/")[2];

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page whenever rows per page change
  };

  return (
    <div className="w-full">
      <Box p={4}>
        <div className="w-full flex justify-between items-center mb-5">
          <Heading size="lg" mb={4} textTransform={"capitalize"}>
            {title}
          </Heading>
          {isAddPage ? (
            <Link href={`/admin/daftar-user/tambah`}>
              <CustomButton>{addTitle}</CustomButton>
            </Link>
          ) : undefined}
        </div>

        <Box overflowX="auto">
          <ChakraTable variant="simple">
            <Thead bg={"primary"}>
              <Tr>
                {columns.map((column) => (
                  <Th key={column.key} color={"white"}>
                    {column.label}
                  </Th>
                ))}
                <Th color={"white"}>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((row, index) => (
                <Tr key={index}>
                  {columns.map((column) => (
                    <Td key={column.key}>{row[column.key]}</Td>
                  ))}
                  {isNoDefaultAction ? undefined : (
                    <Td className="flex items-center space-x-3">
                      <div
                        className="rounded-md bg-yellow-600 cursor-pointer p-2"
                        onClick={() =>
                          router.push(
                            `${currentNav}/edit?id_user=${row.id_user}`
                          )
                        }
                      >
                        <MdEdit className="text-white" />
                      </div>
                      <div
                        className="rounded-md bg-red-600 cursor-pointer p-2"
                        onClick={() => onDelete && onDelete(row.id_produk)}
                      >
                        <MdDelete className="text-white" />
                      </div>
                    </Td>
                  )}

                  {children}
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </Box>
        <Flex mt={4} justify="space-between" align="center">
          <Select
            width="auto"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
          <Box className="flex items-center gap-x-5">
            <CustomButton
              onClick={() => paginate(currentPage - 1)}
              size={"sm"}
              isDisabled={currentPage === 1}
            >
              <FaChevronLeft className="text-white text-sm" />
            </CustomButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <CustomButton
              onClick={() => paginate(currentPage + 1)}
              size={"sm"}
              isDisabled={currentPage === totalPages}
            >
              <FaChevronRight className="text-white text-sm" />
            </CustomButton>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default CustomTable;
