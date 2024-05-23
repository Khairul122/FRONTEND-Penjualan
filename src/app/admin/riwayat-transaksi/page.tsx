import { NextPage } from 'next';
import CustomTable from '@/components/table';
import { riwayatTransaksi } from '@/config/riwayatTransaksi';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { Td } from '@chakra-ui/react';

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-full">
      <CustomTable
        data={riwayatTransaksi.data}
        columns={riwayatTransaksi.columns}
        title="daftar riwayat transaksi"
        isNoDefaultAction
      >
        <Td className="flex items-center space-x-3">
          <div className="rounded-md bg-green-600 cursor-pointer p-2">
            <FaCheck className="text-white" />
          </div>
          <div className="rounded-md bg-red-600 cursor-pointer p-2">
            <FaXmark className="text-white" />
          </div>
        </Td>
      </CustomTable>
    </div>
  );
};

export default Page;
