import type { ButtonProps } from '@material-ui/core'
import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'

interface RHFSubmitButtonProps {
  /** When true disables button (without showing loading indicator) */
  disabled?: boolean
  /** When length is greater than zero disables button */
  errors?: Record<string, unknown>
  /** When true disables button and shows loading indicator inside button */
  loading: boolean
  buttonProps?: ButtonProps
  buttonText?: string
}

export const RHFSubmitButton = ({
  disabled,
  errors,
  loading,
  buttonProps,
  buttonText,
}: RHFSubmitButtonProps): JSX.Element => (
  <Button
    {...buttonProps}
    type="submit"
    disabled={loading || disabled || Object.keys(errors ?? {}).length > 0}
  >
    {loading ? <CircularProgress size={23} /> : buttonText ?? 'Submit'}
  </Button>
)
