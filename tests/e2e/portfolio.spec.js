import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const responsiveWidths = [320, 375, 430, 768, 1024, 1280, 1440]

test('renders without console or page errors', async ({ page }) => {
  const errors = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Building production systems and AI-powered products.')
  expect(errors).toEqual([])
})

test('passes an automated WCAG A and AA scan', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
})

test('uses one H1, valid local anchors, and explicit image metadata', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toHaveCount(1)

  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href !== '#' && !document.getElementById(href.slice(1))),
  )
  expect(invalidAnchors).toEqual([])

  const invalidImages = await page.locator('img').evaluateAll((images) =>
    images
      .filter((image) => !image.hasAttribute('alt') || !image.hasAttribute('width') || !image.hasAttribute('height'))
      .map((image) => image.getAttribute('src')),
  )
  expect(invalidImages).toEqual([])
})

test('has no horizontal overflow at required responsive widths', async ({ page }) => {
  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }))

    expect(dimensions.document, `Horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport)
  }
})

test('keeps visible interactive targets at least 44 pixels tall', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const undersizedTargets = await page.locator('a:visible, button:visible').evaluateAll((elements) =>
    elements
      .map((element) => {
        const bounds = element.getBoundingClientRect()
        return {
          label: element.getAttribute('aria-label') || element.textContent.trim(),
          height: Math.round(bounds.height),
        }
      })
      .filter((target) => target.height < 44),
  )

  expect(undersizedTargets, JSON.stringify(undersizedTargets, null, 2)).toEqual([])
})

test('mobile navigation supports focus, Escape, and state restoration', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const menuButton = page.locator('.menu-button')
  await expect(menuButton).toHaveAccessibleName('Open navigation menu')
  await menuButton.focus()
  await page.keyboard.press('Enter')

  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await expect(menuButton).toHaveAccessibleName('Close navigation menu')
  await expect(page.locator('body')).toHaveClass(/menu-open/)
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work' })).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await expect(menuButton).toHaveAccessibleName('Open navigation menu')
  await expect(page.locator('body')).not.toHaveClass(/menu-open/)
  await expect(menuButton).toBeFocused()
})
