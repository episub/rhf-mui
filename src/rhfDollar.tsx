import { InputAdornment, TextField } from '@material-ui/core'
import { CurrencyUsd } from 'mdi-material-ui'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { RHFFieldProps } from './shared'
import { useRHFGetFields } from './shared'

/**
 * react-hook-form field for working with dollars. The field value is expected
 * to be representing dollars **not** cents (with the input value being a number
 * not a string).
 */
export const RHFDollar = ({
  name,
  label,
  disabled,
  textFieldProps,
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
          inputProps={{ step: 0.01, type: 'number' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CurrencyUsd color="action" />
              </InputAdornment>
            ),
          }}
          {...mergedTextProps}
          id={`dollar-field-${name}`}
          disabled={disabled}
          error={isError}
          helperText={fieldError?.message ?? mergedTextProps.helperText}
          label={label}
        />
      }
      name={name}
      control={control}
    />
  )
}
