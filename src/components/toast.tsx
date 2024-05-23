import { useToast, UseToastOptions } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (options: UseToastOptions) => {
    toast({
      duration: 3000,
      isClosable: true,
      position: 'top-right',
      ...options,
    });
  };

  return showToast;
};

export default useCustomToast;
