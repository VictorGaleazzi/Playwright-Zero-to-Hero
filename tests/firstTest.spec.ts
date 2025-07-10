import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/')
  await page.getByTitle('Forms').click()
  await page.getByTitle('Form Layouts').click()

})

test('Locator syntax rules', async ({page}) => {
  //By tag name
  page.locator('input')

  //By ID
  page.locator('#inputEmail')

  //By class value
  page.locator('.shape-rectangle')

  //By attribute
  page.locator('[placeholder="Email"]')

  //By class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //By XPath (Não recomendado)
  page.locator('//*[@id="inputEmail"]')

  //By partial text match
  page.locator(':text("Using")')

  //By exact text match
  page.locator(':text-is("Using the Grid")')

  //combine diferent selector
  page.locator('input[placeholder="Email"]')
})

test('User facing locators', async ({page}) => {
  await page.getByRole('textbox', {name: "Email"}).first().click()
  await page.getByRole('button', {name: "Sign in"}).first().click()
  
  await page.getByLabel('Email').first().click()
  
  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('')

  await page.getByTitle('IoT Dashboard').click()
})

test('Locating child elements', async ({page}) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

})

test('Locating parents elements', async ({page}) => {
  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).first().click()
  await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).first().click()

  await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
  await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})

test('Reusing the locators', async ({page}) => {
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const emailField = basicForm.getByRole('textbox', {name: "Email"})

  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async ({page}) => {
  //single test value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect (buttonText).toEqual("Submit")

  //all text values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonLabels).toContain('Option 1')

  //input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@test.com')

  //attribute value
  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({page}) => {
  const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

  //A diferença estre essas duas validações é que no General é feito sobre a variavel ou valor enquanto
  //O locator assertion é feito sobre o locator e pode interagir com a página
  //No General nao temos espera nenhuma, no locator tem uma espera dinamica de 5 segundos
  //Soft assertion: o teste pode prosseguir mesmo com a validação falhando

  //General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual("Submit")

  //Locator assertion
  await expect(basicFormButton).toHaveText("Submit")

  //Soft assertion
  await expect.soft(basicFormButton).toHaveText("Submit5")
  await basicFormButton.click()
})