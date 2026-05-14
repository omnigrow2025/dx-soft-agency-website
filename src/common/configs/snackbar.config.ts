import type { SnackbarProviderProps } from "notistack";

export const snackbarConfig: SnackbarProviderProps = {
  maxSnack: 2,
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};
