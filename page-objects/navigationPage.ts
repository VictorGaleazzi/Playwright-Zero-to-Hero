import { Page } from "@playwright/test"

export class NavigationPage {

  readonly page: Page 

  constructor(page: Page) {
    this.page = page
  }

  async formLayoutsPage() {
    await this.selectGroupMenuITem('Forms')
    await this.page.getByText('Form Layouts').click()
  
  }

  async datePickerPage() {
    await this.selectGroupMenuITem('Forms')
    await this.page.getByTitle('Datepicker').click()  
  }

  async smartTablePage() {
    await this.selectGroupMenuITem('Tables & Data')
    await this.page.getByTitle('Smart Table').click()
  
  }

  async toastrPage() {
    await this.selectGroupMenuITem('Modal & Overlays')
    await this.page.getByTitle('Toastr').click()
  
  }

  async tooltipPage() {
    await this.selectGroupMenuITem('Modal & Overlays')
    await this.page.getByTitle('Tooltip').click()
  }

  private async selectGroupMenuITem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle)
    const expandedState = await groupMenuItem.getAttribute('aria-expanded')

    if(expandedState == "false"){
      await groupMenuItem.click()
    }
  }
}