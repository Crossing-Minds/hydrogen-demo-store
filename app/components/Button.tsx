import type {FunctionComponent} from 'react'

import type {ButtonVariant} from './Button.css'
import {buttonStyle} from './Button.css'

interface ButtonProps {
  onClick: () => void
  title: string
  variant?: ButtonVariant
}

export const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  title,
  variant = 'primary'
}) => {
  return (
    <button className={buttonStyle[variant]} onClick={onClick}>
      {title}
    </button>
  )
}
