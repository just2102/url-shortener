import { toast } from "react-toastify";

export const showInfoToast = (text: string) => {
  toast(text, {
    type: "info",
  });
};
