import OscillatorController from "./OscillatorController";
import View from "../view";

export default class OscillatorView extends View {
	constructor() {
		super({
			templateSelector: "#oscillator", 
			controller: new OscillatorController
		});
	}
}
