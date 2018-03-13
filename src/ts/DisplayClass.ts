export default class Display {
	private elem: HTMLElement;
	private inner: string;
	constructor() {
		this.elem = document.getElementById('display');
		this.inner = this.elem.innerHTML;
	}
	reset() {
		this.elem.innerHTML = this.inner;
	}
}
