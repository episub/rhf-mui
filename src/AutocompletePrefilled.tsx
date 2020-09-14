import type { TextFieldProps } from '@material-ui/core';
import { CircularProgress, TextField } from '@material-ui/core'
import type { AutocompleteProps } from '@material-ui/lab';
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import type { O } from 'ts-toolbelt'
import {
  ListboxComponent,
  RenderListOption,
  useListboxStyles,
} from './ListboxComponent'

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

/**
 * AutocompletePrefilled component is configured as an easy way to setup an
 * autocomplete field with virtulised fields already setup.
 */
export const AutocompletePrefilled = <T,>({
  loading,
  textProps,
  autoCompleteProps,
  disabled,
}: Props<T>) => {
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
