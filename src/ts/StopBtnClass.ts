import Btn from './BtnClass';
///import Reel from './ReelClass';

export default class StopBtn extends Btn {
	///private reel: Reel;
	constructor(elem) {
		super(elem);
		///this.reel = reel;
		this.disabled();
	}
	get elem() {
		return this._elem;
	}
	//ボタンを無効化にするメソッド
	public disabled() {
		this._elem.disabled = true;
	}
	//ボタンを有効化にするメソッド
	public enabled() {
		this._elem.disabled = false;
	}
}
