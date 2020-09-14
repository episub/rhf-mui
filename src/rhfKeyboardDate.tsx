import { KeyboardDatePicker } from '@material-ui/pickers'
import React from 'react'
import { Controller } from 'react-hook-form'
import type { RHFFieldProps } from './shared'
import { useRHFGetFields } from './shared'

interface KeyboardDateProps extends RHFFieldProps {
  clearable?: boolean
  displayDateFormat?: string
}

export const RHFKeyboardDate = (props: KeyboardDateProps): JSX.Element => {
  const { isError, fieldError, control, textFieldProps } = useRHFGetFields({
    name: props.name,
    textFieldProps: props.textFieldProps,
  })

  const {
    variant,
    onChange: _fieldChange,
    onBlur: _fieldBlur,
    onError: _onError,
    ...otherTextProps
  } = textFieldProps

  return (
    <Controller
      render={({ onChange, value, onBlur }) => (
        <KeyboardDatePicker
          {...otherTextProps}
          onChange={onChange}
          value={value}
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
