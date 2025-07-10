import {test, expect} from '@playwright/test'

test('Drag and Drop With iFrame', async({page}) => {
  //o iframe é como uma página dentro de outra pagina, um html dentro de outro, e o playwright nao consegue
  //manipular diretamente o segundo html, precisamos entrar nesse segundo e dai sim buscar nossos elementos e executar ações

  await page.goto('https://www.globalsqa.com/demo-site/draganddrop')

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

  await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))
})

test('More precise Drag and Drop With iFrame', async({page}) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop')

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

  await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))

  await frame.locator('li', {hasText:"High Tatras 4"}).hover()
  await page.mouse.down()
  await frame.locator('#trash').hover()
  await page.mouse.up()

  await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})
