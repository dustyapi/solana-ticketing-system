import { HashLoader } from "react-spinners";

function PreLoader() {
    const colors = {
      "success": "white",
      "primary":"#4E44CE",
      "warning": "white",
    };
    return (
      <HashLoader color={colors["primary"]} loading size={100} speedMultiplier={1} />
    );
}
export default PreLoader;