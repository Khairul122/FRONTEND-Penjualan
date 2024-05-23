import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface props extends ButtonProps {
  children: any; // Specify the type of the 'title' prop as string
}

const CustomButton: React.FC<props> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      bg={'primary'}
      textTransform={'capitalize'}
      color={'white'}
      _hover={{
        bg: 'primary',
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
