/* @flow */
import { cleanPath } from './util/path'
import { assert } from './util/warn'

export function removeRouteMap (
  location: string,
  oldPathList?: Array<string>,
  oldPathMap?: Dictionary<RouteRecord>,
  oldNameMap?: Dictionary<RouteRecord>
): Dictionary<RouteRecord> {
  if (process.env.NODE_ENV !== 'production') {
    assert(oldPathList && oldPathMap, `route definition is empty`)
  }

  // the path list is used to control path matching priority
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)

  const normalizedPath = normalizePath(location)

  // remove routes which path and parent match normalizedPath
  // pending paths to remove
  const pathToRemove: Array<string> = [normalizedPath]

  const removedRoutes = {}

  while (pathToRemove.length) {
    const target = pathToRemove.pop()
    objIterator(pathMap, (path, route) => {
      const { name, parent } = route

      // sub items
      if (parent && parent.path === target && pathToRemove.indexOf(path) === -1) {
        pathToRemove.push(path)
      }

      if (path !== target) {
        // $flow-disable-line
        return
      }

      removedRoutes[path] = route

      // remove from pathList
      const idx = pathList.indexOf(path)
      if (idx !== -1) {
        pathList.splice(idx, 1)
      }

      // remove from pathMap
      delete pathMap[path]

      // remove from nameMap
      if (nameMap && name) {
        delete pathMap[name]
      }
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Object.keys(removedRoutes).length, `route path not found: ${location}`)
  }

  return removedRoutes
}

function objIterator (obj, handler) {
  for (const key in obj) {
    handler(key, obj[key])
  }
}

function normalizePath (
  path: string,
  parent?: RouteRecord,
  strict?: boolean
): string {
  if (!strict) path = path.replace(/\/$/, '')
  if (path[0] === '/') return path
  if (parent == null) return path
  return cleanPath(`${parent.path}/${path}`)
}
