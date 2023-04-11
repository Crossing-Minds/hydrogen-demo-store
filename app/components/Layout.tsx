import type {FunctionComponent, PropsWithChildren} from 'react'

interface LayoutProps {
  title: string
}

export const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
  title
}) => {
  return (
    <div>
      <header role="banner">
        <div>
          <a href="/">{title}</a>
        </div>
      </header>

      <main role="main" id="mainContent">
        {children}
      </main>
    </div>
  )
}
