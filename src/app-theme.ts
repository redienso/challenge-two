export type AppTheme = {
  palette: {
    background: {
      default: string;
      light: string;
    };
    primary: string;
    secondary: string;
  };
  font: {
    regular: string;
    bold: string;
  };
};

export const theme: AppTheme = {
  palette: {
    background: {
      default: "#f5f5f5",
      light: "white",
    },
    primary: "#000000",
    secondary: "#4a4a4a",
  },
  font: {
    regular: "HelveticaNeue",
    bold: "HelveticaNeueBold",
  },
};
