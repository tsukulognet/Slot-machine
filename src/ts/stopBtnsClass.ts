import StopBtn from './StopBtnClass';

export default class StopBtns {
	private stopBtnLeft: StopBtn;
	private stopBtnCenter: StopBtn;
	private stopBtnRight: StopBtn;
	
	private _elems: StopBtn[] = [];
	constructor(fn) {
		this.stopBtnLeft = new StopBtn("btn-left");
		this.stopBtnCenter = new StopBtn("btn-center");
		this.stopBtnRight = new StopBtn("btn-right");
		this._elems = [this.stopBtnLeft, this.stopBtnCenter, this.stopBtnRight];
		for(let i = 0; i < this._elems.length; i++) {
			this._elems[i].elem.addEventListener('click', () => fn());//this.reel.stop
		}
	}
	get elems() {
		return this._elems;
	}
}
