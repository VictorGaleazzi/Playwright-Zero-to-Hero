import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/')

})

test.describe('Form layout page',() => {
  test.beforeEach(async ({page}) => {
    await page.getByTitle('Forms').click()
    await page.getByTitle('Form Layouts').click()
  })

  test('input fields', async ({page}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill('test2@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})//simula aperto de tecla a tecla, podemos usar o delay entre cada pressionada

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

  })

  test('radio buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

    await usingTheGridForm.getByLabel('Option 1').check({force: true})//foi usado o forece true pq mesmo visivel em tela o radio button, 
    // ele tem a propriedade hidden por padrao, e pro playwright ele nao estava aparecendo

    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()
    
    //generic assertion
    expect(radioStatus).toBeTruthy()

    //locator assertion
    await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked()

    //generic assertion para validar que opção 1 está desmarcada e 2 está marcado
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy
  })
})

test('checkboxes', async ({page}) => {
  await page.getByTitle('Modal & Overlays').click()
  await page.getByTitle('Toastr').click()

  await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})// usado o force true pq o elemento tem uma propriedade (native-input visually-hidden)
  await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})// check só marca o checkbox caso esteja desmarcado 
  await page.getByRole('checkbox', {name: "Show toast with icon"}).uncheck({force: true})// uncheck só desmarca o checkbox que estiver marcado

  //forma de marcar todos os checkboxes da página
  const allBoxes = page.getByRole('checkbox')
  for(const box of await allBoxes.all()){
    await box.check({force: true})
    expect(await box.isChecked()).toBeTruthy();
  }
})

test('list and dropdowns', async ({page}) => {
  const dropDownMenu = page.locator('ngx-header nb-select')
  await dropDownMenu.click()

  page.getByRole('list')//quando a lista tem a tag UL
  page.getByRole('listitem')//quando a lista tem a tag LI

  // const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator('nb-option-list nb-option')
  await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])

  await optionList.filter({hasText: "Cosmic"}).click()
  // await page.getByText('Cosmic').click()

  const header = page.locator("nb-layout-header")
  await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

  //selecionar todas as opções e validar todas as cores
  const colors = {
    "Light": "rgb(255, 255, 255)", 
    "Dark": "rgb(34, 43, 69)", 
    "Cosmic": "rgb(50, 50, 89)", 
    "Corporate": "rgb(255, 255, 255)", 
  }

  await dropDownMenu.click()
  for(const color in colors){
    await optionList.filter({hasText: color}).click()
    await expect(header).toHaveCSS('background-color', colors[color])
    if(color != "Corporate")
      await dropDownMenu.click()
  }

})

test('tooltips', async ({page}) => {
  await page.getByTitle('Modal & Overlays').click()
  await page.getByTitle('Tooltip').click()

  const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
  await toolTipCard.getByRole('button', {name: "Top"}).hover()

  page.getByRole('tooltip')// se tiver a tooltip criada assim como botoes e tudo mais, nesse site de estudo nao temos
  const tooltip = await page.locator('nb-tooltip').textContent()
  expect(tooltip).toEqual('This is a tooltip')
})

test('dialog box', async ({page}) => {
  await page.getByTitle('Tables & Data').click()
  await page.getByTitle('Smart Table').click()

  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?")
    dialog.accept()
  })
  
  await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
  //nessa linha a caixa de dialogo que é do navegador e nao da pra manipular pelo dom, é automaticamente cancelada pelo playwright
  //entao temos que superar esse comportamento
  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})

test('web tables', async ({page}) => {
  await page.getByTitle('Tables & Data').click()
  await page.getByTitle('Smart Table').click()

  //1- get the row by any test in this row
  const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})//nessa forma se for buscar a linha e tiver mais de uma com o mesmo valor lascou-se, tipo idade e id
  const inputEditor = page.locator('input-editor')

  await targetRow.locator('.nb-edit').click()
  await inputEditor.getByPlaceholder('Age').clear()
  await inputEditor.getByPlaceholder('Age').fill('22')
  await page.locator('.nb-checkmark').click()
})

test('web tables2', async ({page}) => {
  await page.getByTitle('Tables & Data').click()
  await page.getByTitle('Smart Table').click()

  //2- navigate to second page and get the value in specific column
  const inputEditor = page.locator('input-editor')

  await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
  const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
  await targetRowById.locator('.nb-edit').click()
  await inputEditor.getByPlaceholder('E-mail').clear()
  await inputEditor.getByPlaceholder('E-mail').fill('test@test.com.br')
  await page.locator('.nb-checkmark').click()
  await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com.br')


})

test('web tables3', async ({page}) => {
  await page.getByTitle('Tables & Data').click()
  await page.getByTitle('Smart Table').click()

  const inputFilter = page.locator('input-filter')

  const ages = ["20", "30", "40", "200", ]

  for(let age of ages) {
    await inputFilter.getByPlaceholder('Age').clear()
    await inputFilter.getByPlaceholder('Age').fill(age)
    await page.waitForTimeout(500)

    const ageRows = page.locator('tbody tr')

    for( let row of await ageRows.all()){
      const cellValue = await row.locator('td').last().textContent()

      if(age == "200"){
        expect(await page.getByRole('table').textContent()).toContain('No data found')
      }else {
        expect(cellValue).toEqual(age)
      } 
    }
  }
})

test('datepicker', async ({page}) => {
  await page.getByTitle('Forms').click()
  await page.getByTitle('Datepicker').click()

  const calendarImputField = page.getByPlaceholder('Form Picker')
  await calendarImputField.click()

  // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1').click()
  // dessa forma vai falhar pq o 1 está em vários campos, e o getByText busca parcialmente o texto e nao o texto exato
  // para isso temos que udar o exact: true
  await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
  await expect(calendarImputField).toHaveValue('Jun 1, 2025')

})

test('dinamic datepicker', async ({page}) => {
  await page.getByTitle('Forms').click()
  await page.getByTitle('Datepicker').click()

  const calendarImputField = page.getByPlaceholder('Form Picker')
  await calendarImputField.click()

  //o date no javascript nos permite usar vários métodos padrões para capturar valores da data, hora, ano e assim por diante,
  // podemos manipular esses valores e transformar em string para que seja entendido na hora da automação

  let date = new Date()
  date.setDate(date.getDate() + 46)
  const expectedDate = date.getDate().toString()
  const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
  const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

  while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()

  }

  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
  await expect(calendarImputField).toHaveValue(dateToAssert)

})

test('sliders', async ({page}) => {
  //atualizando o valor de atributos do slider (atalho)
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate( node => {
    node.setAttribute('cx', '232.630')
    node.setAttribute('cy', '232.630')
  })

  await tempGauge.click()
})

test('sliders 2', async ({page}) => {
  //movendo o mouse
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded()

  //precisamos usar o método boundingBox, que cria uma caixa delimitador pelo playwright, que no nosso caso sera limitada no tamanho do tempBox
  // ele funciona como cordenadas x e y, onde y é vertical e x é horizontal. No ponto esquerdo superior será o ponto 0. Então de acordo com as cordenadas passadar no metodo,
  // será simulado o movimento do mouse. Para movimentar o mouse fora da bounding box é só usar coordenadas negativas
  const box = await tempBox.boundingBox()
  
  //vamos usar o centro da bounding box para ininicar a manipulação
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x +100, y)
  await page.mouse.move(x +100, y +100)
  await page.mouse.up()

  await expect(tempBox).toContainText('30')
})