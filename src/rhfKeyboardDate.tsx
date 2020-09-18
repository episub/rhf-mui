import { KeyboardDatePicker } from '@material-ui/pickers'
import type { ParsableDate } from '@material-ui/pickers/constants/prop-types'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { RHFFieldProps } from './shared'
import { useRHFGetFields } from './shared'

interface RHFKeyboardDateProps extends RHFFieldProps {
  clearable?: boolean
  displayDateFormat?: string
}

export const RHFKeyboardDate = (props: RHFKeyboardDateProps): JSX.Element => {
  const { isError, fieldError, control, textFieldProps } = useRHFGetFields({
    name: props.name,
    textFieldProps: props.textFieldProps,
  })

  const { variant, ...otherTextProps } = textFieldProps

  return (
    <Controller
      render={({ onChange, value, onBlur }) => (
        <KeyboardDatePicker
          {...otherTextProps}
          onChange={onChange}
          value={value as ParsableDate}
          onBlur={onBlur}
          disabled={props.disabled}
          error={isError}
          format={props.displayDateFormat}
          helperText={fieldError?.message ?? otherTextProps.helperText}
          label={props.label}
          inputVariant={variant}
          InputAdornmentProps={{ position: 'start' }}
          clearable={props.clearable}
        />
      )}
      control={control}
      name={props.name}
    />
  )
}
