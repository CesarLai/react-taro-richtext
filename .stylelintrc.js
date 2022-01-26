module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-rational-order'
  ],
  ignoreFiles: ['node_modules', 'dist'],
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
}
