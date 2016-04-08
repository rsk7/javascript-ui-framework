function innerHtmlSetter(outputContainer, dataOut) {
	let modelProperty = outputContainer.getAttribute("d-value");
	outputContainer.innerHTML = dataOut[modelProperty];
}

function inputEventHandler(event, modelUpdater) {
	let modelProperty = event.target.getAttribute("d-key");
	modelUpdater({
		modelProperty: modelProperty,
		value: event.target.value
	});
}

function createTemplateClone(template) {
	let instance = document.importNode(template.content, true);
	let wrapperDiv = document.createElement("div");
	wrapperDiv.appendChild(instance);
	return wrapperDiv.children[0];
}

export default class View {
	constructor({templateSelector, controller}) {
	  let templateEl = document.querySelector(templateSelector);
		this.el = createTemplateClone(templateEl);
		this.setup(controller);
	}

	setup(controller) {
		Object.keys(controller.model).forEach((key) => {
			let inputProvider = this.inputTagDataIn(key);
			let outputUpdater = this.innerHtmlSetter(key);
			controller.inout(inputProvider, outputUpdater);
		});
	}

	inputTagDataIn(modelKey) {
		let selector = "input[d-key='" + modelKey + "']";
		let inputs = this.el.querySelectorAll(selector);
		return function attachListener(modelUpdater) {
			for (var i = 0; i < inputs.length; i++) {
				let inputNode = inputs[i];
				inputNode.addEventListener("input", (event) => {
					inputEventHandler(event, modelUpdater);
				});
			}
		};
	}

	innerHtmlSetter(modelKey) {
		let selector = "[d-value='" + modelKey + "']";
		let outputContainers = this.el.querySelectorAll(selector);
		return function updateOutput(dataOut) {
			for(var i = 0; i < outputContainers.length; i++) {
				let outputContainerNode = outputContainers[i];
				innerHtmlSetter(outputContainerNode, dataOut);
			}
		};
	}
}
