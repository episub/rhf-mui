import type { TextFieldProps } from '@material-ui/core'
import type { ReactNode } from 'react'
import type { FieldError} from 'react-hook-form';
import { get, useFormContext } from 'react-hook-form'

export const DefaultTextFieldProps: TextFieldProps = {
  variant: 'outlined',
  fullWidth: true,
}

export interface RHFFieldProps {
  name: string
  label?: ReactNode
  disabled?: boolean
  textFieldProps?: Omit<
    TextFieldProps,
    'onChange' | 'onBlur' | 'onFocus' | 'onError' | 'value'
  >
}

/**
 * A helper function to quickly get all the values rhf values needed to
 * implement an input in material-ui. Given a field name and text props it will
 * return associated errors and a new TextFieldProps object with common defaults
 * set
 */
export const useRHFGetFields = ({
  name,
  textFieldProps,
}: Pick<RHFFieldProps, 'name' | 'textFieldProps'>) => {
  const { control, errors } = useFormContext()

  const fieldError: FieldError | undefined = get(errors, name)
  const isError = !!fieldError

  return {
    control,
    fieldError,
    isError,
    textFieldProps: {
      ...DefaultTextFieldProps,
      ...textFieldProps,
    },
  }
}
