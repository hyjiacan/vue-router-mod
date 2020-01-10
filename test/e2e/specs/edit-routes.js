const bsStatus = require('../browserstack-send-status')

module.exports = {
  ...bsStatus(),

  '@tags': ['history'],

  'edit-routes': function (browser) {
    browser
      .url('http://localhost:8080/edit-routes/')
      .waitForElementVisible('#app', 1000)
      .assert.count('li', 2)
      .assert.count('li a', 2)
      .assert.attributeContains('li:nth-child(2) a', 'href', '/test')
      .assert.containsText('.view', 'home')

      .click('li:nth-child(2) a')
      .assert.urlEquals('http://localhost:8080/edit-routes/test')
      .assert.containsText('#name', 'Old')

      .click('#replace-btn')
      .click('li:nth-child(2) a')
      .assert.urlEquals('http://localhost:8080/edit-routes/test')
      .assert.containsText('#name', 'New')

      .click('#replace-btn')
      .click('li:nth-child(2) a')
      .assert.urlEquals('http://localhost:8080/edit-routes/test')
      .assert.containsText('#name', 'Old')

      .click('#remove-btn')
      .click('#replace-btn')
      .assert.containsText('#message', 'route path not found: /test')

      .click('#remove-btn')
      .assert.containsText('#message', 'route path not found: /test')

      .end()
  }
}
