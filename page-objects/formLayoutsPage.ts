import { Page } from "@playwright/test"

export class FormLayoutsPage {

  private readonly page: Page 

  constructor(page: Page) {
    this.page = page
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
    const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
    await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
    await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
    await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
    await usingTheGridForm.getByRole('button').click()

  }

  /**
   * This method will out the Inline form with user details
   * @param name - should me first and last name
   * @param email - valid email for the test user
   * @param rememberMe - true or false if user session to me saved
   */
  async submitInlineFormWithnameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
    const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
    await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
    await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
    if(rememberMe)
      await inlineForm.getByRole('checkbox').check({force: true})
    await inlineForm.getByRole('button').click()

  }
}