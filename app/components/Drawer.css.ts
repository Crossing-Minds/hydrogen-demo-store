import {style} from '@vanilla-extract/css'

import {vars} from '~/styles/theme.css'

export const DialogStyle = style({
  position: 'relative',
  zIndex: 50
})

export const BackgroundEnterStyle = style({
  transitionDuration: '300ms',
  transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1);'
})

export const BackgroundEnterFromStyle = style({
  left: 0,
  opacity: 0
})

export const BackgroundEnterToStyle = style({
  opacity: 100
})

export const BackgroundLeaveStyle = style({
  transitionDuration: '200ms',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1);'
})

export const BackgroundLeaveFromStyle = style({
  opacity: 100
})

export const BackgroundLeaveToStyle = style({
  opacity: 0
})

export const BackgroundStyle = style({
  background: '#000',
  inset: '0px',
  position: 'fixed',
  opacity: 0.25
})

export const WrapperStyle = style({
  inset: 0,
  position: 'fixed'
})

export const WrapperSecondStyle = style({
  inset: 0,
  overflow: 'hidden',
  position: 'absolute'
})

export const WrapperThirdStyle = style({
  bottom: 0,
  display: 'flex',
  overflow: 'hidden',
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      paddingLeft: 40,
      width: 'auto'
    }
  }
})

export const ContentEnterStyle = style({
  transform:
    'translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);',
  transitionDuration: '500ms',
  transitionProperty:
    'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

export const ContentEnterFromStyle = style({
  transform: 'translateX(100%)'
})

export const ContentEnterToStyle = style({
  transform: 'translateX(0px)'
})

export const ContentLeaveStyle = style({
  transform:
    'translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);',
  transitionDuration: '500ms',
  transitionProperty:
    'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

export const ContentLeaveFromStyle = style({
  transform: 'translateX(0px)'
})

export const ContentLeaveToStyle = style({
  transform: 'translateX(100%)'
})

export const DialogPanelStyle = style({
  background: vars.colors.white,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  transform:
    'translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);',
  transitionDuration: '150ms',
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  verticalAlign: 'middle',
  width: '100%',
  '@media': {
    '(min-width: 1024px)': {
      width: 391
    }
  }
})

export const DialogPanelHeaderStyle = style({
  alignItems: 'center',
  display: 'flex',
  flex: 0,
  height: 96,
  justifyContent: 'space-between',
  padding: 16,
  position: 'sticky',
  top: 0
})

export const CloseIconStyle = style({
  background: 'none',
  border: 0,
  cursor: 'pointer'
})
