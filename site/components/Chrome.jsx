import Link from "next/link";

const NAV = [
  ["/services", "What we build"],
  ["/work", "Our work"],
  ["/#how", "How it works"],
  ["/#faq", "Questions"],
  ["/about", "About"],
];

export function Header({ current }) {
  return (
    <header className="top">
      <div className="wrap">
        <Link className="mark" href="/" aria-label="Cliffhouse Studio home">
          <span className="ch cond">CH</span>
          <span className="stack cond">Cliff<br />House</span>
        </Link>
        <nav className="links" aria-label="Main">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <a className="btn" href="#contact">Get a free look</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Cliffhouse Studio · Vancouver, BC</span>
        <span>Strong foundations. Better views.</span>
      </div>
    </footer>
  );
}

export function PageHead({ label, title, children }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <p className="label">{label}</p>
        <h1 className="cond">{title}</h1>
        {children && <p className="lede">{children}</p>}
      </div>
    </section>
  );
}
