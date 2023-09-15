/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
  import React from 'react';
  import { FieldError, UseFormRegister, Path } from 'react-hook-form';
  import { FiEye, FiEyeOff } from 'react-icons/fi';
  
  interface FormInputProps<TFormValues extends Record<string, unknown>> {
    name: Path<TFormValues>;
    placeholder?: string;
    label?: string;
    register: UseFormRegister<TFormValues>;
    error: FieldError | undefined;
    type?: string;
    required?: boolean;
    disableLabel?: boolean;
    validate?: Record<string, unknown>;
    icon?: JSX.Element;
    variant?: string;
    borderColor?: string;
    borderRadius?: string;
    placeholderColor?: string;
    defaultValue: string | number | undefined;
    format?: string;
    value?: string | number | undefined;
    testId?: string;
    w?: string;
    padding?: string;
    pattern?: string;
  }
  
  export const PrimaryInput = <TFormValues extends Record<string, any>>({
    name,
    type = 'text',
    label = '',
    register,
    error,
    placeholder = '',
    required = false,
    validate = undefined,
    variant = 'outline',
    testId,
    defaultValue,
    icon,
  }: FormInputProps<TFormValues>): JSX.Element => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <FormControl
        isInvalid={error as unknown as boolean}
        variant={variant ? variant : 'outline'}
      >
        <FormLabel
          color="brandBlack.100"
          htmlFor={name}
          fontSize={['44', '36', '24', '16']}
        >
          {label}
        </FormLabel>
        <InputGroup>
          <Input
            // autoComplete="off"
            _autofill={{ WebkitBoxShadow: '0 0 0 30px white inset' }}
            id={name}
            placeholder={placeholder}
            _placeholder={{ color: '#9C9898' }}
            focusBorderColor={'brandGreen.100'}
            errorBorderColor={'red.500'}
            {...register(name, { required, ...validate })}
            size={'lg'}
            isInvalid={error as unknown as boolean}
            type={showPassword ? 'text' : type}
            name={name}
            data-testid={testId}
            fontSize={['32', '24', '16']}
            height={['20', '12']}
            disabled={false}
            defaultValue={defaultValue}
          />
          {icon && (
            <InputRightElement height={'100%'}>
              <Center>
                <Button
                  padding={'0'}
                  _hover={{ bgColor: 'transparent' }}
                  _focus={{ border: 'none' }}
                  bgColor={'transparent'}
                  onClick={() => setShowPassword(!showPassword)}
                  cursor={type ? 'pointer' : 'text'}
                >
                  {type == 'password' ? (
                    showPassword ? (
                      <FiEyeOff size={'24px'} />
                    ) : (
                      <FiEye size={'24px'} />
                    )
                  ) : (
                    icon
                  )}
                </Button>
              </Center>
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage fontSize={['24', '16']}>
          {error?.message}
        </FormErrorMessage>
      </FormControl>
    );
  };