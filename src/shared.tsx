import type { TextFieldProps } from '@material-ui/core'
import { CircularProgress, makeStyles, TextField } from '@material-ui/core'
import type { AutocompleteProps } from '@material-ui/lab'
import { Autocomplete } from '@material-ui/lab'
import type { ReactNode } from 'react'
import React from 'react'
import type { Control, FieldError } from 'react-hook-form'
import { get, useFormContext } from 'react-hook-form'
import type { O } from 'ts-toolbelt'
import { ListboxComponent, RenderListOption } from './ListboxComponent'

interface Props<T> {
  loading: boolean
  disabled?: boolean
  textProps?: O.Omit<TextFieldProps, 'disabled'>
  autoCompleteProps: O.Omit<
    O.Required<AutocompleteProps<T, false, false, false>, 'getOptionLabel'>,
    | 'classes'
    | 'disableListWrap'
    | 'ListboxComponent'
    | 'renderOption'
    | 'renderInput'
    | 'loading'
    | 'disabled'
  >
}

type TextFieldCutDown = Omit<
  TextFieldProps,
  'onChange' | 'onBlur' | 'onFocus' | 'onError' | 'value'
>

interface RHFFieldMeta {
  control: Control<Record<string, unknown>>
  fieldError: FieldError | undefined
  isError: boolean
  textFieldProps: TextFieldCutDown
}

export const useListboxStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
})

/**
 * A helper function to quickly get all the values rhf values needed to
 * implement an input in material-ui. Given a field name and text props it will
 * return associated errors and a new TextFieldProps object with common defaults
 * set
 */
export const useRHFGetFields = ({
  name,
  textFieldProps,
}: Pick<RHFFieldProps, 'name' | 'textFieldProps'>): RHFFieldMeta => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, errors } = useFormContext()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

export const DefaultTextFieldProps: TextFieldProps = {
  variant: 'outlined' as 'outlined' | 'filled' | 'standard',
  fullWidth: true,
}

export interface RHFFieldProps {
  name: string
  label?: ReactNode
  disabled?: boolean
  textFieldProps?: TextFieldCutDown
}

/**
 * AutocompletePrefilled component is configured as an easy way to setup an
 * autocomplete field with virtulised fields already setup.
 */
export const AutocompletePrefilled = <T,>({
  loading,
  textProps,
  autoCompleteProps,
  disabled,
}: Props<T>): JSX.Element => {
  const classes = useListboxStyles()

  return (
    <Autocomplete
      multiple={false}
      disableClearable={false}
      freeSolo={false}
      loading={loading}
      disabled={disabled}
      {...autoCompleteProps}
      classes={classes}
      disableListWrap
      ListboxComponent={
        ListboxComponent as React.ComponentType<
          React.HTMLAttributes<HTMLElement>
        >
      }
      renderOption={(option, { inputValue: input }) =>
        RenderListOption(autoCompleteProps.getOptionLabel(option), input)
      }
      renderInput={(params) => (
        <TextField
          {...textProps}
          {...params}
          disabled={disabled}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}
