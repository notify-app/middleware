'use strict'

module.exports = function middleware () {
  /**
   * listeners contains all middlewares which will be considered when a request
   * is recieved.
   * @type {Array}
   */
  const listeners = []

  /**
   * requestListener is the function which should be set as a listener for new
   * requests.
   * @param  {http.IncomingMessage} req http request object.
   * @param  {http.ServerResponse}  res http response object.
   */
  function requestListener (req, res) {
    if (listeners.length === 0) return
    const it = listeners[Symbol.iterator]()
    next(it, req, res)
  }

  /**
   * use is used to include new middlewares.
   * @param  {Function} middleware request listener to added
   */
  requestListener.use = function use (middleware) {
    listeners.push(middleware)
  }

  /**
   * clear all middlewares.
   */
  requestListener.clear = function clear () {
    listeners = []
  }

  /**
   * next invokes the next middleware, if any.
   * @param  {Iterator}             it  contains the process done while going
   *                                    through all the available middlewares.
   * @param  {http.IncomingMessage} req http request object.
   * @param  {http.ServerResponse}  res http response object.
   */
  function next (it, req, res) {
    const listener = it.next()
    if (listener.done === true) return
    listener.value(req, res, next.bind(null, it, req, res))
  }

  return requestListener
}
