import Controller from "../controller";
import OscillatorModel from "./OscillatorModel";

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class OscillatorController extends Controller {
	constructor() {
		super(new OscillatorModel);
		this.oscillator = audioCtx.createOscillator();
		this.oscillator.start(0);
		this.gainNode = audioCtx.createGain();
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(audioCtx.destination);
		this.update();
	}

	update() {
		this.oscillator.frequency.value = this.model.freq;
		this.gainNode.gain.value = this.model.on ? this.model.gain : 0;
	}
}
