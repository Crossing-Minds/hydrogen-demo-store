import classNames from 'classnames'
import type {FunctionComponent} from 'react'

import type {ButtonVariant} from './Button.css'
import {buttonLoaderStyle, buttonLoadingStyle, buttonStyle} from './Button.css'

interface ButtonProps {
  className?: string
  loading?: boolean
  onClick?: () => void
  title: string
  variant?: ButtonVariant
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
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
          [buttonLoadingStyle]: loading
        },
        className
      )}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <span className={buttonLoaderStyle} /> : title}
    </button>
  )
}
