import Btn from './BtnClass';

export default class ReplayBtn extends Btn {
	constructor(elem, fn) {
		super(elem);
		this.hide();
		this._elem.addEventListener('click', () => fn());
	}
	//リプレイボタンを表示するメソッド
	public show() {
		this._elem.classList.remove("hide");
	}
	//リプレイボタンを非表示にするメソッド
	public hide() {
		this._elem.classList.add("hide");
	}
}
