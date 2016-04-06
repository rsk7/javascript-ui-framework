let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let inputTagDataIn = function(instance, querySelector, eventType, prop) {
  return function(datain) {
    let input = instance.querySelector(querySelector);
    input.addEventListener(eventType, (event) => {
      event.preventDefault();
      datain(prop, event.target.value);
    });
  };
};

let outputInnerHtmlSetter = function(instance, querySelector, prop) {
  return function(out) {
    let outputContainer = instance.querySelector(querySelector);
    outputContainer.innerHTML = out[prop];
  };
};

// oscillatorController
// prop: 
// - freq
// - gain
// - on/off
function createOscillatorUi(oscillatorController, node) {
  let template = document.querySelector("#oscillator");
  let instance = document.importNode(template.content, true);

  // workaround
  let wrapperDiv = document.createElement("div");
  wrapperDiv.appendChild(instance);
  let instanceNode = wrapperDiv.children[0];

  // setup data display
  let freqIn = inputTagDataIn(instanceNode, "#freqIn", "input", "freq");
  let freqOut = outputInnerHtmlSetter(instanceNode, "#freq", "freq");
  oscillatorController.bindInOut(freqIn, freqOut);

  let nameIn = inputTagDataIn(instanceNode, "#nameIn", "input", "name");
  let nameOut = outputInnerHtmlSetter(instanceNode, "#name", "name");
  oscillatorController.bindInOut(nameIn, nameOut);

  // gain
  let gainIn = inputTagDataIn(instanceNode, "#gainIn", "input", "gain");
  oscillatorController.bindInOut(gainIn);

  return instanceNode;
};



function OscillatorModel() {
  this.freq = 0;
  this.gain = 0;
  this.name = "Hello";
  this.on = false;
};






function OscillatorController() {
  this.model = new OscillatorModel;
  this.oscillator = audioCtx.createOscillator();
  this.oscillator.start(0);
  this.gainNode = audioCtx.createGain();
  this.oscillator.connect(this.gainNode);
  this.gainNode.connect(audioCtx.destination);
  this.update();
}

OscillatorController.prototype.update = function() {
  this.oscillator.frequency.value = this.model.freq;
  this.gainNode.gain.value = this.model.on ? this.model.gain : 0;
};

OscillatorController.prototype.dataIn = function(out, prop, value) {
  this.model[prop] = value;
  this.update();
  if (out) out(this.model);
};

OscillatorController.prototype.bindInOut = function(setupIn, out) {
  // setup 'in' callback
  setupIn(this.dataIn.bind(this, out));
};

document.addEventListener("DOMContentLoaded", () => {
  let main = document.createElement("div");
  let oscillatorController = new OscillatorController;
  let templateInstance = createOscillatorUi(oscillatorController);
  main.appendChild(templateInstance);
  document.body.appendChild(main);
});


