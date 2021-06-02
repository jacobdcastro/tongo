import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
  headerWeight: '800',
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['300', '400', '500', '600', '700', '800', '900'],
    },
  ],
});

export default typography;
