export default class Controller {
	constructor(model) {
		this.model = model;
	}

	inout(input, output) {
		input(({modelProperty, value}) => {
			this.model[modelProperty] = value;
			this.update();
			if (output) output(this.model);
		});
	}

	update() {}
}
