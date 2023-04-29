import classNames from 'classnames'
import type {FunctionComponent} from 'react'

import type {ButtonVariant} from './Button.css'
import {
  buttonDisabledStyle,
  buttonLoaderStyle,
  buttonLoadingStyle,
  buttonStyle
} from './Button.css'

interface ButtonProps {
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  title: string
  variant?: ButtonVariant
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  disabled = false,
  loading = false,
  onClick,
  title,
  variant = 'primary'
}) => {
  return (
    <button
      className={classNames(
        buttonStyle[variant],
        {
          [buttonDisabledStyle]: disabled,
          [buttonLoadingStyle]: loading
        },
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className={buttonLoaderStyle} /> : title}
    </button>
  )
}
