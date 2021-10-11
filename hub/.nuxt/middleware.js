const middleware = {}

middleware['acl'] = require('..\\middleware\\acl.js')
middleware['acl'] = middleware['acl'].default || middleware['acl']

middleware['hub'] = require('..\\middleware\\hub.js')
middleware['hub'] = middleware['hub'].default || middleware['hub']

export default middleware
