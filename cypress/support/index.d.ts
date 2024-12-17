declare namespace Cypress {
  interface Chainable<Subject> {
    paste(value: string): Chainable<any>
  }
}