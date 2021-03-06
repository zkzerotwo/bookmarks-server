const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, 'Hello, world!')
  })
  // it('GET /articles responds with 200 and all of the articles', () => {
  //   return supertest(app)
  //     .get('/bookmarks')
  //     .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
  //     .expect(200)
  // })
})