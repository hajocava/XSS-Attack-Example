import Head from 'next/head'

type LayoutProps = { children: JSX.Element | JSX.Element[], title?: string }

const siteTitle = "Platzi's Plantpedia"


export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{!title ? siteTitle : `${title} | ${siteTitle}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <noscript id="mui-insertion-point" />
      </Head>
      <div className="local-container container mx-auto max-w-screen-xl w-95">
        <main className="pt-16">{children}</main>
      </div>

      <style jsx global>{`
        #__next {
          min-height: 100vh;
          position: relative;
        }
      `}</style>
    </>
  )
}
