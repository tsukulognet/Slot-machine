export default abstract class Btn {
	protected _elem: HTMLButtonElement;
	constructor(elem) {
		this._elem = <HTMLButtonElement>document.getElementById(elem);
	}
}
