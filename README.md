# Middleware

`Middleware` is a utility that enables the queuing of `request` listeners for an [`HTTP Server`](https://nodejs.org/api/http.html#http_class_http_server).

## API
### .use(listener)
`.use` is used to add new `request` listeners to the queue. These listeners will be invoked with the following arguments:

Argument.  | Type       | Description
---------- | ---------- | -----------
`request`  | [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) | The HTTP Request.
`response` | [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse) | The HTTP Response.
`next`     | `Function` | This function is used to continue to the next listener in the queue.

### .clear()
`.clear` is used to clear all `request` listeners from the queue.

## Example

```javascript
const middleware = require('notify-middleware')
const app = middleware()

// Since this listener is first one, it will always be invoked.
app.use((req, res, next) => {
    if (req.method === 'POST') next()
})

// This listener is only invoked on a POST HTTP Request.
app.use((req, res, next) => {
    console.log('POST REQUEST!!')
})
```