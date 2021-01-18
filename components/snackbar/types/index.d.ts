import Snackbar from "./Snackbar.svelte";
import type { SnackbarProps } from "../types/Snack";
interface SnackbarComponent {
    close(): void;
}
declare const show: (props: SnackbarProps) => SnackbarComponent;
export default Snackbar;
export { show };
