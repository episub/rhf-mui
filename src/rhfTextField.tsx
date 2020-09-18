import { TextField } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { RHFFieldProps } from './shared'
import { useRHFGetFields } from './shared'

export const RHFTextField = ({
  name,
  textFieldProps,
  ...otherProps
}: RHFFieldProps): JSX.Element => {
  const {
    control,
    textFieldProps: mergedTextProps,
    isError,
    fieldError,
  } = useRHFGetFields({ name, textFieldProps })

  return (
    <Controller
      as={
        <TextField
          {...otherProps}
          {...mergedTextProps}
          helperText={fieldError?.message ?? mergedTextProps.helperText}
          error={isError}
        />
      }
      name={name}
      control={control}
    />
  )
}
