import SlotMachine from './SlotMachineClass';

export default class StartLever {
	private ball: HTMLElement;
	private stick: HTMLElement;
	private ballHeight: number;
	private ballY: number;
	private stickHeight: number;
	private stickY: number;
	private isDragging: boolean;
	private dy: number;
	private my: number;
	private distance: number;
	constructor() {
		this.ball = document.querySelector(".lever-ball");//レバーのボール部分(以下ボールと略す)
		this.stick = document.querySelector(".lever-stick");//レバーのスティック部分(以下スティックと略す)
		this.ballHeight = this.ball.clientHeight;//ボールの高さ
		this.ballY = this.ball.offsetTop;//ボールのoffsetParentからの相対的なy座標(offsetParentとなる要素のpaddingの上端部分から、その要素のborderの上端部分までの幅)
		this.stickHeight = this.stick.clientHeight;//スティックの高さ
		this.stickY = this.stick.offsetTop;//スティックのoffsetParentからの相対的なy座標
		this.isDragging = false;//ボールがドラッグされたかどうか
		this.ball.addEventListener("mousedown", e => this.down(e), false);
		this.ball.addEventListener("touchstart", e => this.down(e), false);
	}
	reset() {
		this.ball.style.transform = "";//ボールに追加したスタイルを削除
		this.stick.style.transform = "";
	}
	//ボールを押下したときのカーソルの座標を取得するメソッド
	private down(e) {
		//リールが動いている間はスタートレバーの操作を禁止とする。document.body.addEventListener...の後に書いてしまうと、すでにthis.move(e)が呼ばれているのでこの記述は意味がなくなる。
		if (SlotMachine.isPlaying) {
			return;
		}
		this.isDragging = true;//ドラッグ開始
		console.log("down!");
		let event;
		if (e.type === "mousedown") {
			event = e;
		} else {
			event = e.changedTouches[0];
		}
		this.dy = event.pageY - this.ballY;//this.ballYからの相対的なカーソルのy座標
		//ボールを押下したまま動かすとmove(e)メソッドが実行される
		document.body.addEventListener("mousemove", e => this.move(e), false);
		document.body.addEventListener("touchmove", e => this.move(e), false);
	}
	//ボールが移動できる範囲を制限するユーティリティメソッド
	private static clamp(number, min, max) {
		return Math.max(min, Math.min(number, max));
	}
	//ドラッグ中のカーソルの座標を取得し、それを基にスタートレバーの移動範囲を制限するメソッド
	private move(e) {
		//ドラッグ中であれば
		if (this.isDragging) {
			let event;
			if (e.type === "mousemove") {
				event = e;
			} else {
				event = e.changedTouches[0];
			}
			this.my = event.pageY;//カーソルの絶対的なy座標
			e.preventDefault();//ドラッグ時にリール内のアイコンが選択されるのを防ぐ
			this.distance = this.my - this.dy;//this.dyからの相対的なカーソルの移動中のy座標
			//移動(this.distance)の開始点をボールの中心(this.distance + this.ballH / 2)に変更
			this.ball.style.transform =
				"translateY(" +
				StartLever.clamp(
					this.distance + this.ballHeight / 2,
					this.stickY,
					this.stickHeight * 2 - (this.ballY + this.ballHeight / 2)
				) +
				"px)";//ボールが移動できる範囲をthis.stickYからthis.stickH * 2 - (this.ballY + this.ballH / 2)までにする
			//移動(this.distance)の開始点をスティックの先端(this.distance + this.ballH)に変更
			this.stick.style.transform =
				"rotateX(" + StartLever.clamp(this.distance + this.ballHeight, 0, 180) + "deg)";//スティックを倒せる範囲を0度から180度までにする
			//ボールの押下をやめるとup(e)メソッドが実行される
			document.body.addEventListener("mouseup", e => this.up(e), false);
			document.body.addEventListener("mouseleave", e => this.up(e), false);
			document.body.addEventListener("touchend", e => this.up(e), false);
			document.body.addEventListener("touchleave", e => this.up(e), false);
		}
	}
	//ドロップしたときのボールの位置を取得し、スタートさせるべきかを判断するメソッド
	private up(e) {
		//ドラッグ中であれば(現時点でドラッグ中ではないがスタート中にイベント(mouseup,mouseleave,touchend,touchleave)が反応してup(e)メソッドが実行されるのを防ぐために判定している)
		if (this.isDragging) {
			this.isDragging = false;//ドラッグ終了
			//これまで適用されていたイベントリスナー削除
			document.body.removeEventListener("mouseup", e => this.up(e), false);
			document.body.removeEventListener("mouseleave", e => this.up(e), false);
			document.body.removeEventListener("mousemove", e => this.move(e), false);
			document.body.removeEventListener("touchend", e => this.up(e), false);
			document.body.removeEventListener("touchleave", e => this.up(e), false);
			document.body.removeEventListener("touchmove", e => this.move(e), false);
			//スタートレバーを倒しきるのに十分な移動量であれば
			if (this.distance >= this.stickHeight * 2) {
				//スタートレバーを倒し切ったらmousedownを削除。スタート中に反応させないため
				this.ball.removeEventListener("mousedown", e => this.down(e), false);
				this.ball.removeEventListener("touchstart", e => this.down(e), false);
				//倒しきったのでスタートレバーを固定
				this.ball.style.transform = `translateY(${this.stickHeight * 2 - (this.ballY + this.ballHeight / 2)}px)`;
				this.stick.style.transform = `rotateX(${180}deg)`;
				SlotMachine.isPlaying = true;//スロットスタート
				/////run();//リールを動かす
			} 
			//十分でなければ
			else {
				//スタートレバーを元の位置に戻す
				this.ball.style.transform = `translateY(${0}px)`;
				this.stick.style.transform = `rotateX(${0}deg)`;
				SlotMachine.isPlaying = false;//スタートしません
			}
		}
	}
}
