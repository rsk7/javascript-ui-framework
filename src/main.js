import OscillatorView from "./Oscillator/OscillatorView";

document.addEventListener("DOMContentLoaded", () => {
  let main = document.createElement("div");
  let oscillatorView = new OscillatorView();
  main.appendChild(oscillatorView.el);
  document.body.appendChild(main);
});
