React + Mobx Quick Starter project
---
The goal of this project is to provide a starting base for an isomorphic (universal) mobx react project.

Features:
+ `async/await` support
+ Isomorphic
+ CSS and SCSS compilation
+ MongoDB user register/login/logout
+ Token based authentication
+ Decorators for easily accessing the state
+ Hot reloading and sourcemaps
+ Automatic restarts _(when server code changes)_


![Preview](https://raw.githubusercontent.com/nightwolfz/mobx-starter/master/preview.png)


## How to run

For development:

    npm run dev

For production:

    npm run prod

## Requirements

    Node 6+ or Node 4 with additional babel plugins
    MongoDB server

## Goals

- Optimized for minimal bundle size.
- Optimized for speed.
- Using MobX, the easiest and insanely fast state manager.
- Simple and minimal with routing, authentication, database and server-side rendering.
- Good developer experience with hot-reloading and source-maps.


# Benchmarks

```sh
gb -k=true -c 300 -n 10000 http://localhost:2000/page/about

This is GoHttpBench, Version 0.1.9, https://github.com/parkghost/gohttpbench
Author: Brandon Chen, Email: parkghost@gmail.com
Licensed under the MIT license

...

Concurrency Level:      300
Time taken for tests:   15.34 seconds
Complete requests:      10000
Failed requests:        0
HTML transferred:       11190000 bytes
Requests per second:    651.80 [#/sec] (mean)
Time per request:       460.263 [ms] (mean)
Time per request:       1.534 [ms] (mean, across all concurrent requests)
HTML Transfer rate:     712.22 [Kbytes/sec] received

Connection Times (ms)
              min       mean[+/-sd]     median  max
Total:        166       1   149.29      412     1527
```
Tested on i7-6700K @ 4.00GHz 16GB RAM. Single node.js instance.


Adding database (mongodb) models
--
1. Goto `src/server/models`
2. Add `[Name].js` with your model in it

Adding stores
--
1. Goto `src/client/stores`
2. Add `[name].js` (based on another store like `account.js`)
3. Update `src/client/stores.js`


F.A.Q.
--
### What are `stores` ?

Stores will contain the state of your application and the methods that mutate that state.
Basically most of your client side logic is inside stores.


### What is `@inject()` and `@observer` ?

The `@inject` decorator injects stores into your components.
Additionally by adding `@observer` your components will efficiently auto update with any changes to your stores.

_Example: If you display a `messageCount` from a `Messages` store and it gets updated,
then all the visible components that display that `messageCount` will update themselves._


### Does observing many components make my app slower?

**No**, it actually allows the rendering to be done more efficiently. So observe as many as you want !


### My components are not updating!

Make sure you added the `@observer` decorator to your component.

### My stateless component doesn't have access to the stores !

You cannot use decorators on stateless components.
You should instead wrap your component like this:

```js
const MyComponent = inject('myStore')(observer((props, context) => {
  return <p>{props.myStore.something} !</p>
}))
````

### How do I execute async actions on the server and/or client ?

Add a static `onEnter` method to your component like this:

```js
class MyComponent extends React.Component {
    static onEnter({ state, store }, params) {
        return store.myStore.browse()
    }
    // ...
}
```

The `onEnter` method is smart, it will be executed either on the server or on the browser depending on how you access the website.

It also passes all your stores and url params as arguments as a convenience.

How it works (server)
--
1. `index.js` initializes the logger, generates a webpack bundle and runs the server

2. The server runs a bunch of middleware:

    1. `context.js` creates your initial state based on your stores defined in `src/client/stores.js`
    2. `authorize.js` checks if you are logged in and have access to protected routes.
    3. `render.js` finally renders your components.
    
3. `server.js` also imports the routes from `server/routes` where each route can use a database model defined in `server/models`.
Just adding a model file there is enough, the models are initialized when they are used.

## How it works (client)

1. `client.js` initializes the stores, hot-reloading and other helpers. 
2. It hydrates the state we got from the server and renders `pages/Index.js`
3. `pages/Index.js` is basically your entry point. What you do afterwards is up to you!

## Useful links

[MobX](https://mobxjs.github.io/mobx/)


## Author

Ryan Megidov

<https://github.com/nightwolfz/mobx-starter>
