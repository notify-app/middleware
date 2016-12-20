'use strict'

const sinon = require('sinon')
const assert = require('assert')
const middleware = require('../index')

describe('Scenario: Including a middleware:', function () {
  describe('Given a middleware handler instance,', function () {
    let app = null

    beforeEach(function () {
      app = middleware()
    })

    describe('with a single middleware,', function () {
      let listener = null

      beforeEach(function () {
        listener = sinon.stub()
        app.use(listener)
      })

      describe('when the middleware handler instance is invoked with a request & response object,', function () {
        let req = null
        let res = null

        beforeEach(function () {
          req = {}
          res = {}
          app(req, res)
        })

        describe('should invoke the middleware', function () {
          it('once', function () {
            assert.strictEqual(listener.callCount, 1)
          })

          it('with the request object', function () {
            assert.strictEqual(listener.getCall(0).args[0], req)
          })

          it('with the response object', function () {
            assert.strictEqual(listener.getCall(0).args[1], res)
          })

          it('with a function used to invoke the next listener in line', function () {
            assert.strictEqual(typeof listener.getCall(0).args[2], 'function')
          })
        })
      })
    })
  })
})

describe('Scenario: Including & invoking multiple middlewares:', function () {
  describe('Given a middleware handler instance,', function () {
    let app = null

    beforeEach(function () {
      app = middleware()
    })

    describe('with multiple middlewares,', function () {
      let listenerOne = null
      let listenerTwo = null
      let listenerThree = null

      beforeEach(function () {
        listenerOne = (req, res, next) => { next() }

        listenerOne = sinon.spy(listenerOne)
        listenerTwo = sinon.stub()
        listenerThree = sinon.stub()

        app.use(listenerOne, listenerTwo, listenerThree)
      })

      describe('when the middleware instance is invoked with a request & response object,', function () {
        let req = null
        let res = null

        beforeEach(function () {
          req = {}
          res = {}
          app(req, res)
        })

        it('should only invoke the reachable middlewares', function () {
          assert.strictEqual(listenerOne.callCount, 1)
          assert.strictEqual(listenerTwo.callCount, 1)
          assert.strictEqual(listenerThree.callCount, 0)
        })
      })
    })
  })
})

describe('Scenario: Clearing middlewares:', function () {
  describe('Given a middleware handler instance,', function () {
    let app = null

    beforeEach(function () {
      app = middleware()
    })

    describe('with a middleware,', function () {
      let listener = null

      beforeEach(function () {
        listener = sinon.stub()
        app.use(listener)
      })

      describe('when clearing the middlewares,', function () {
        beforeEach(function () {
          app.clear()
        })

        describe('and invoking the middleware handler instance', function () {
          let req = null
          let res = null

          beforeEach(function () {
            req = {}
            res = {}
            app(req, res)
          })

          it('should not invoke the middleware that was removed', function () {
            assert.strictEqual(listener.callCount, 0)
          })
        })
      })
    })
  })
})
