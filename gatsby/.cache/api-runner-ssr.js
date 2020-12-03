var plugins = [{
      plugin: require('/Users/urbs/Desktop/master-gatsby-master/starter-files/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/urbs/Desktop/master-gatsby-master/starter-files/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"jl7mw5dn","dataset":"production","watchMode":true,"token":"skUGw71A2eLyKT0OUQo5OmrymDWEqxXFKgCuH8nUrPJsLuxhgMw9J27kBesabVt7NrhsPZGlL3cWejpsw5FU6WcapPdSOF2EnVR7la0JD2keCHs0ExGphypHgy37fFVoFo8xI16rQS2BStsO7fKYuvgPqBqk4tee4H9r7tCevSUvpSTjpJny"},
    },{
      plugin: require('/Users/urbs/Desktop/master-gatsby-master/starter-files/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
