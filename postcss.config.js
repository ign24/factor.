export default {
  plugins: {
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace'
    },
    cssnano: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifySelectors: true,
        mergeLonghand: true,
        mergeRules: true,
        reduceInitial: true,
        reduceTransforms: true,
        zindex: false, // Mantener z-index para evitar problemas de layering
        discardUnused: true,
        discardDuplicates: true,
        discardEmpty: true,
        minifyGradients: true,
        minifyParams: true,
        minifySelectors: true,
        normalizeCharset: true,
        normalizeDisplayValues: true,
        normalizePositions: true,
        normalizeRepeatStyle: true,
        normalizeString: true,
        normalizeTimingFunctions: true,
        normalizeUnicode: true,
        normalizeUrl: true,
        orderedValues: true,
        reduceIdents: true,
        reduceListStyle: true,
        reducePositions: true,
        reduceTimingFunctions: true,
        uniqueSelectors: true
      }]
    }
  }
}
