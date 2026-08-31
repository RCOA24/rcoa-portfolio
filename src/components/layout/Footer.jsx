import Container from './Container'
import { site } from '../../data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <div><strong>{site.name}</strong><span>{site.role}</span></div>
        <p>© {new Date().getFullYear()} Rodney Austria</p>
        <a href="#top">Back to top ↑</a>
      </Container>
    </footer>
  )
}
