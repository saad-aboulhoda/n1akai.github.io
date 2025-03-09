import { select } from "../utils.js";
import { showMessage } from "../functions/showMessage.js";

export function contact() {
  const form = select("#contact-form");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const url = event.target.action;

    const submitButton = form.querySelector('[type="submit"]');

    try {
      submitButton.setAttribute("disabled", "true");
      const response = await fetch(url, {
        method: form.method,
        body: data,
        headers: {
          Accept: "Application/Json",
        },
      });
      let message = "";

      if (response.ok) {
        message = "Your message was sent successfully!";
        form.reset();
      } else {
        message = "Something went wrong!";
      }

      showMessage(message);
    } catch (error) {
      console.log(error);

      showMessage("Something went wrong!");
    } finally {
      submitButton.removeAttribute("disabled");
    }
  }

  form.addEventListener("submit", handleSubmit);
}
