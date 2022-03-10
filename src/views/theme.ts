import { createTheme } from '@mui/material/styles';
import { blue, blueGrey } from '@mui/material/colors';

// 画面の最小&最大サイズ定義
export const FLEXIBLE_MIN_WIDTH = 1025;
export const FLEXIBLE_MAX_WIDTH = 1366;

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minWidth: `${FLEXIBLE_MIN_WIDTH}px`,
          color: '#333333',
          backgroundColor: blueGrey[50],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#333333',
        },
      },
    },
  },
});

export default theme;
