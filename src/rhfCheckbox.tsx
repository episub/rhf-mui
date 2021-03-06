import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { RHFFieldProps } from './shared'
import { useRHFGetFields } from './shared'

/**
 * react-hook-form field for using a checkbox
 */
export const RHFCheckbox = ({
  name,
  label,
  disabled,
}: Omit<RHFFieldProps, 'textFieldProps'>): JSX.Element => {
  const { control, isError, fieldError } = useRHFGetFields({ name })

  return (
    <FormControl error={isError}>
      <FormGroup>
        <FormControlLabel
          label={label}
          control={
            <Controller
              name={name}
              control={control}
              render={({ onChange, onBlur, value, name: renderName }) => (
                <Checkbox
                  disabled={disabled}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value as boolean}
                  name={renderName}
                />
              )}
            />
          }
        />
        <FormHelperText>{fieldError?.message}</FormHelperText>
      </FormGroup>
    </FormControl>
  )
}
