import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// alert submit button when roommee trying to remove someone on his/her match status
export function removeStatusConfirmation(setState) {
  confirmAlert({
    title: "Confirm to submit",
    message:
      "The roommee will be removed from your status, but you can still find him/her in the match page. Please confirm your action",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          setState("no");
        },
      },
      {
        label: "No",
        onClick: () => {
          setState("yes");
        },
      },
    ],
  });
}
