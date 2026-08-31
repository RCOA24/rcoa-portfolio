import { expect, test } from '@playwright/test'

const canonicalUrl = 'https://rcoa.netlify.app/'

test('publishes consistent search and social metadata', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Rodney Austria | Full-Stack Developer')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-PH')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonicalUrl)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /enterprise healthcare software/i)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /max-image-preview:large/)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${canonicalUrl}rodney-austria-portfolio-og.png`)
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630')
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
})

test('publishes a connected profile-page JSON-LD graph', async ({ page }) => {
  await page.goto('/')

  const schema = await page.locator('script[type="application/ld+json"]').evaluate((script) => JSON.parse(script.textContent))
  const types = schema['@graph'].map((entity) => entity['@type'])

  expect(schema['@context']).toBe('https://schema.org')
  expect(types).toEqual(expect.arrayContaining(['WebSite', 'ProfilePage', 'ImageObject', 'Person']))

  const profile = schema['@graph'].find((entity) => entity['@type'] === 'ProfilePage')
  const person = schema['@graph'].find((entity) => entity['@type'] === 'Person')
  expect(profile.mainEntity['@id']).toBe(person['@id'])
  expect(person.sameAs).toEqual(expect.arrayContaining([
    'https://github.com/RCOA24',
    'https://www.linkedin.com/in/rodney-austria-/',
  ]))
})

test('serves crawler discovery files and the social image', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  const sitemap = await request.get('/sitemap.xml')
  const socialImage = await request.get('/rodney-austria-portfolio-og.png')

  expect(robots.ok()).toBeTruthy()
  expect(await robots.text()).toContain(`Sitemap: ${canonicalUrl}sitemap.xml`)

  expect(sitemap.ok()).toBeTruthy()
  expect(await sitemap.text()).toContain(`<loc>${canonicalUrl}</loc>`)

  expect(socialImage.ok()).toBeTruthy()
  expect(socialImage.headers()['content-type']).toContain('image/png')
})
