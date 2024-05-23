// CustomInput.tsx
import React, { HTMLInputTypeAttribute, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface Props {
  id: string;
  errorMessage?: string;
  isInvalid?: boolean;
  noLabel?: boolean;
  title?: string;
  type?: HTMLInputTypeAttribute;
}

const CustomInput: React.FC<Props> = ({
  id,
  title,
  errorMessage,
  isInvalid,
  type,
  noLabel = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl isInvalid={isInvalid}>
      {!noLabel && (
        <FormLabel htmlFor={id} color="black">
          {title}
        </FormLabel>
      )}
      <InputGroup size="md">
        <Input
          type={showPassword ? 'text' : type || 'text'}
          id={id}
          color="black"
          bg="#97979780"
          variant="filled"
          {...props}
        />
        {type === 'password' && (
          <InputRightElement width="4.5rem">
            <button onClick={togglePasswordVisibility}>
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </InputRightElement>
        )}
      </InputGroup>
      {errorMessage && (
        <FormErrorMessage size="xs" color="red">
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomInput;
