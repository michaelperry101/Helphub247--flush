import Head from 'next/head'
export default function Layout({children}){
  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>HelpHub247 — Carys</title>
      <link rel="icon" href="/logo.svg" />
    </Head>
    <div className="container">
      <header className="header">
        <div className="brand"><img src="/logo.svg" alt="HelpHub247 logo" /></div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </nav>
      </header>
      {children}
      <footer className="footer">
        © {new Date().getFullYear()} HelpHub247 Ltd · Company No: <strong>12345678</strong> · VAT: <strong>GB123456789</strong>
        <div className="small">Support: support@helphub247.co.uk</div>
      </footer>
    </div>
  </>)
}
