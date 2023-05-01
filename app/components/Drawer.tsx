import {Dialog, Transition} from '@headlessui/react'
import type {FunctionComponent, PropsWithChildren} from 'react'
import {Fragment, useState} from 'react'

import iconClose from '~/assets/icon-close.svg'

import {
  BackgroundEnterFromStyle,
  BackgroundEnterStyle,
  BackgroundEnterToStyle,
  BackgroundLeaveFromStyle,
  BackgroundLeaveStyle,
  BackgroundLeaveToStyle,
  BackgroundStyle,
  CloseIconStyle,
  ContentEnterFromStyle,
  ContentEnterStyle,
  ContentEnterToStyle,
  ContentLeaveFromStyle,
  ContentLeaveStyle,
  ContentLeaveToStyle,
  DialogPanelHeaderStyle,
  DialogPanelStyle,
  DialogStyle,
  WrapperSecondStyle,
  WrapperStyle,
  WrapperThirdStyle
} from './Drawer.css'

interface DrawerProps {
  close: () => void
  onClose: () => void
  open: boolean
  title: string
}

export const Drawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  children,
  close,
  onClose,
  open,
  title
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className={DialogStyle} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={BackgroundEnterStyle}
          enterFrom={BackgroundEnterFromStyle}
          enterTo={BackgroundEnterToStyle}
          leave={BackgroundLeaveStyle}
          leaveFrom={BackgroundLeaveFromStyle}
          leaveTo={BackgroundLeaveToStyle}
        >
          <div className={BackgroundStyle} />
        </Transition.Child>

        <div className={WrapperStyle}>
          <div className={WrapperSecondStyle}>
            <div className={WrapperThirdStyle}>
              <Transition.Child
                as={Fragment}
                enter={ContentEnterStyle}
                enterFrom={ContentEnterFromStyle}
                enterTo={ContentEnterToStyle}
                leave={ContentLeaveStyle}
                leaveFrom={ContentLeaveFromStyle}
                leaveTo={ContentLeaveToStyle}
              >
                <Dialog.Panel className={DialogPanelStyle}>
                  <header className={DialogPanelHeaderStyle}>
                    <h2>{title}</h2>
                    <button className={CloseIconStyle} onClick={close}>
                      <img alt="Close Drawer Icon" src={iconClose} />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const useDrawer = (openDefault = false) => {
  const [isOpen, setIsOpen] = useState(openDefault)

  function openDrawer() {
    setIsOpen(true)
  }

  function closeDrawer() {
    setIsOpen(false)
  }

  return {
    closeDrawer,
    isOpen,
    openDrawer
  }
}
