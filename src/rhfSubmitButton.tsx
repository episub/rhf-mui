import type { ButtonProps } from '@material-ui/core'
import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import type { O } from 'ts-toolbelt'

/**
 * If number of errors in RHF is greater than this value it should disable submit
 */
const DISABLE_THRESHOLD = 0

interface ExtraProps {
  /** When true disables button (without showing loading indicator) */
  disabled?: boolean
  /** When length is greater than zero disables button */
  errors?: Record<string, unknown>
  /** When true disables button and shows loading indicator inside button */
  loading: boolean
  buttonText?: string
}

type Props = O.Merge<ExtraProps, O.Omit<ButtonProps, 'children'>>

export const RHFSubmitButton = ({
  disabled,
  errors,
  loading,
  buttonText,
  ...otherProps
}: Props): JSX.Element => (
  <Button
    {...otherProps}
    type="submit"
    disabled={
      loading ||
      disabled ||
      Object.keys(errors ?? {}).length > DISABLE_THRESHOLD
    }
  >
    {loading ? <CircularProgress size={23} /> : buttonText ?? 'Submit'}
  </Button>
)
