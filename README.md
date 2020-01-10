# vue-router-mod

This is a **MOD** version based on vue-router [3.1.3](https://github.com/vuejs/vue-router/releases/tag/v3.1.3).

### Introduction

`vue-router-mod` provides extra apis to replace/remove route dynamically.

### Install

```shell script
npm install @hyjiacan/vue-router-mod --save
# or
yarn add @hyjiacan/vue-router-mod
```

You **should not** install package `vue-router` if you install this.

### Usage

### router.removeRoute

Signature：

```js
router.removeRoute(location: string)
```

Dynamically remove route from router (and the children).  The argument must be a valid `path`。

Sample:

```js
const router = new Router({
  routes: [{
    path: '/a',
    component: {name: 'A'}, 
    children: [{
      path: '/a/b',
      component: {name: 'B'},
    }]
  }, {
    path: '/a/c',
    component: {name: 'C'}
  }]
})

router.removeRoute('/a')
```

Now, route `/a` and its child `/a/b` was removed.
 
> Keep in mind, route `/a/c` is still available.

### router.replaceRoutes

Signature：

```js
router.replaceRoutes(routes: Array<RouteConfig> | RouteConfig)
```

Dynamically replace routes from router. The argument must be an Array/Object using the same route config format with the `routes` constructor option.

### Related issue

- https://github.com/vuejs/vue-router/issues/3087

### Development Setup

``` bash
# install deps
npm install

# build dist files
npm run build

# serve examples at localhost:8080
npm run dev

# lint & run all tests
npm test

# serve docs at localhost:8080
npm run docs
```

## Releasing

- `yarn run release`
  - Ensure tests are passing `yarn run test`
  - Build dist files `VERSION=<the_version> yarn run build`
  - Build changelog `yarn run changelog`
  - Commit dist files `git add dist CHANGELOG.md && git commit -m "[build $VERSION]"`
  - Publish a new version `npm version $VERSION --message "[release] $VERSION"
  - Push tags `git push origin refs/tags/v$VERSION && git push`
  - Publish to npm `npm publish`

## License

[MIT](http://opensource.org/licenses/MIT)

## Thanks

Thanks to Evan-You who makes such a amazing framework.
