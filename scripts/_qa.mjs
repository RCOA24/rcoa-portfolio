// Temporary visual-QA helper. Usage: node scripts/_qa.mjs <tag> [widths comma list] [sections comma list]
import { chromium } from '@playwright/test'

const tag = process.argv[2] || 'qa'
const widths = (process.argv[3] || '390,768,1024,1280,1440,1920').split(',').map(Number)
const sections = (process.argv[4] || 'fold,metrics').split(',')
const out = `${process.env.TEMP}\\rcoa-qa`
const browser = await chromium.launch({ channel: 'msedge' })

for (const width of widths) {
  const height = width < 700 ? 844 : width >= 1920 ? 1080 : 900
  const page = await browser.newPage({ viewport: { width, height } })
  await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    await document.fonts.ready
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) }
    window.scrollTo(0, 0)
    await Promise.all([...document.images].map((img) => img.complete ? img.decode().catch(() => null) : new Promise((r) => { img.onload = img.onerror = r })))
  })

  if (sections.includes('metrics')) {
    const m = await page.evaluate(() => {
      const box = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return `${Math.round(r.left)}+${Math.round(r.width)}` }
      return {
        container: box('.container-shell'), h1: box('.hero h1'), intro: box('.hero-intro'),
        media1: box('#healthbridge .project-media'), body1: box('#healthbridge .project-body'),
        archiveMedia: box('#typhoguard .project-media'), expContent: box('.experience-content'),
        pageH: document.documentElement.scrollHeight,
      }
    })
    console.log(width, JSON.stringify(m))
  }
  if (sections.includes('fold')) await page.screenshot({ path: `${out}\\${tag}-${width}-fold.png` })
  for (const sel of sections.filter((s) => s.startsWith('#') || s.startsWith('.'))) {
    const name = sel.replace(/[^a-z0-9]/gi, '')
    await page.locator(sel).first().screenshot({ path: `${out}\\${tag}-${width}-${name}.png` })
  }
  await page.close()
}
await browser.close()
