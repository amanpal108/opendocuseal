module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        docuseal: {
          'color-scheme': 'light',
          primary: '#6560FF',
          'primary-content': '#ffffff',
          secondary: '#C2C1FF',
          'secondary-content': '#050B14',
          accent: '#EDCB8B',
          'accent-content': '#050B14',
          neutral: '#050B14',
          'neutral-content': '#ffffff',
          'base-100': '#faf7f5',
          'base-200': '#efeae6',
          'base-300': '#e7e2df',
          'base-content': '#091422',
          '--rounded-btn': '1.9rem',
          '--tab-border': '2px',
          '--tab-radius': '.5rem'
        }
      }
    ]
  }
}
