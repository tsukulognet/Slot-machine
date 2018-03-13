import StopBtn from './StopBtnClass';

export default class Reel {
	private _items;
	private elem: Element;
	///private lastItem;
	private stopBtn: StopBtn;
	private requestId;
	private _stopCount: number;

	constructor(elem) {
		this._items = [];//この配列内でリール内の要素を並び替える
		this.elem = document.getElementsByClassName(elem)[0];
		this._items.push(Array.prototype.slice.call(this.elem.children));//リール内の要素を配列要素としてthis.itemに格納
		//console.log(this.item);
		///this.lastItem = [];//リール内の最後の要素を格納する
		/////this.stopBtn = stopBtn;//自身を止めるストップボタン
		/////this.requestId = id;
		this._stopCount = 0;//自身が止まるとインクリメント
		/////this.stopBtn.elem.addEventListener('click', () => this.stop());
	}
	get items() {
		return this._items;
	}
	//リールを動かすメソッド
	public move() {
		this.requestId = window.requestAnimationFrame(this.move.bind(this));
		/////this.stopBtn.enabled();//ストップボタンを有効化
		for (let i = 0; i < this._items.length; i++) {
			const lastItem = this._items[i].slice(this._items[i].length - 1);//リール内の最後のアイコンを取得
			this._items[i].pop();////リール内の最後のアイコンを削除
			this._items[i].unshift(lastItem);//リール内の先頭に先ほど取得した最後のアイコンを追加
			for (let j = 0; j < 5; j++) {
				const item = this._items[i][j]; //jを加えて配列からnodeのみを取り出す。じゃないと配列が残っているとappendChildができない。
				//*****console.log(nodeAgain);
				this.elem.appendChild(item);//リール内を更新
			}
		}
	}
	get stopCount() {
		return this._stopCount;
	}
	//リールを止めるメソッド
	public stop() {
		/////Reels.stopCount++;//止まったリールの数
		this._stopCount++;//自身のリールが止まったらインクリメント
		if (this._stopCount > 0) {//自身が止まったら
			this._stopCount = 0;//リセット
			////this.stopBtn.disabled();//自身を止めるストップボタンを無効化
			cancelAnimationFrame(this.requestId);//自身を止める
		}
		////console.log(this.stopBtn.disabled);
		/////console.log(Reels.stopCount);
		//全てのリールが止まったら判定処理を行なう
		///if (Reels.stopCount >= 3) {
		///	judge();
		///}
	}
}