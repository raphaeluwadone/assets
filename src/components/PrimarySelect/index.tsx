import {
    Box,
    FormLabel,
    HStack,
    Select,
    Text,
  } from '@chakra-ui/react';
  import { FieldError, Path, UseFormRegister } from 'react-hook-form';
  
  interface FormInputProps<TFormValues extends Record<string, unknown>> {
    name: Path<TFormValues>;
    placeholder: string;
    register: UseFormRegister<TFormValues>;
    required?: boolean;
    validate?: any;
    error: FieldError | undefined;
    label?: string;
    fontSize?: string;
    options: any[];
    defaultValue?: any;
  }
  export const PrimarySelect = <TFormValues extends Record<string, unknown>>({
    name,
    placeholder,
    register,
    required = false,
    validate = {},
    error,
    label = '',
    options,
    defaultValue,
  }: FormInputProps<TFormValues>) => {
    return (
      <Box>
        <HStack justifyContent={'space-between'}>
          <FormLabel color="brandBlack.100" htmlFor={name}>
            {label}
          </FormLabel>
        </HStack>
  
        <Select
          {...register(name, { required, ...validate })}
          w="full"
          border="1px solid grey"
          borderRadius="3"
          height="3rem"
          fontSize=".9rem"
          placeholder={placeholder}
          defaultValue={defaultValue}
        >
          {/* <option disabled>{placeholder}</option> */}
          {options.map((option, index) => {
            return (
              <option value={option.value} key={index}>
                {option.option}
              </option>
            );
          })}
        </Select>
        <Text fontSize=".7rem" color="red">
          {(error?.type === 'required' && `${label} is required`) ||
            error?.message}
        </Text>
      </Box>
    );
  };