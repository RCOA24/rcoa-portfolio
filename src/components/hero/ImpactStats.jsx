import Container from '../layout/Container'
import { impactStats } from '../../data/site'

export default function ImpactStats() {
  return (
    <section className="impact-section" aria-label="Selected engineering impact">
      <Container className="impact-grid">
        {impactStats.map((stat) => (
          <div className="impact-item" key={stat.label}>
            <strong className="impact-value">{stat.value}</strong>
            <span className="impact-label">{stat.label}</span>
          </div>
        ))}
      </Container>
    </section>
  )
}
