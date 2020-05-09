describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Anni',
        username: 'alaanni',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
      cy.contains('Log in to application')
      cy.get('#username')
      cy.get('#password')
      cy.get('#login-button')

    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('alaanni')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('Anni logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('alamanni')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.get('.error')
              .should('contain', 'wrong credentials')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
              .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'Anni Ala-Mattinen logged in')
        })
      })
    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'alaanni', password: 'salainen' })
            
            cy.contains('create new blog').click()
            cy.get('#title').type('Test Blog')
            cy.get('#author').type('Test by Cypress')
            cy.get('#url').type('www.test.fi')
            cy.get('#create-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('Test by Cypress')
            cy.contains('Test Blog')
        })

        it('A blog can be liked', function() {
            cy.get('#view').click()
            cy.get('#like').click()
            cy.contains(1)
        })

        it('A blog can be removed', function() {
            //cy.get('#view').click()
            //cy.get('#remove').click()
            //cy.get('html').should('not.contain', 'Test by Cypress')
        })
        it('blogs are arranged by likes', function() {

        })
    })
})