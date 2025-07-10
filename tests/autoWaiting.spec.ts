import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()

})

test('auto waiting', async ({page}) => {
  const sucessButton = page.locator('.bg-success')

  // await sucessButton.click()

  // const text = await sucessButton.textContent()
  // await sucessButton.waitFor({state: "attached"})
  // const text = await sucessButton.allTextContents()

  // expect(text).toContain('Data loaded with AJAX get request.')
  await expect(sucessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 5000})
})

test('alternative waits', async ({page}) => {
  const sucessButton = page.locator('.bg-success')

  //wait for element
  // await page.waitForSelector('.bg-success')

  //wait for particular response
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  //wait for network calls to be completed ("Not recomended")
  await page.waitForLoadState('networkidle')


  const text = await sucessButton.allTextContents()

  expect(text).toContain('Data loaded with AJAX get request.')
})
