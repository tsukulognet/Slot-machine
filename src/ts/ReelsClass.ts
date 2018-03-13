import Reel from './ReelClass';

export default class Reels {
	public static stopCount: number = 0;
	private requestId = null;
	private reelLeft: Reel;
	private reelCenter: Reel;
	private reelRight: Reel;
	private _elems: Reel[] = [];
	constructor() {
		this.reelLeft = new Reel('items-left');
		this.reelCenter = new Reel('items-center');
		this.reelRight = new Reel('items-right');
		this._elems = [this.reelLeft, this.reelCenter, this.reelRight];
	}
	get elems() {
		return this._elems;
	}
	public move() {
		for(let i = 0; i < this._elems.length; i++) {
			this._elems[i].move();
		}
	}
	public stop() {
		for(let i = 0; i < this._elems.length; i++) {
			this._elems[i].stop();
			if(this._elems[i].stopCount > 0) {
				Reels.stopCount++;
			}
		}
	}
}
