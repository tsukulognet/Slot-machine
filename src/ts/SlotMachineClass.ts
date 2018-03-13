import StartLever from './StartLeverClass';
import ReplayBtn from './ReplayBtnClass';
///import Reel from './ReelClass';
import Reels from './ReelsClass';
import StopBtns from './StopBtnsClass';
///import StopBtn from './StopBtnClass';
import Display from './DisplayClass';
import ResultMessage from './ResultMessageClass';

export default class SlotMachine {
	public static isPlaying: boolean = false;
	private startLever: StartLever;
	private display: Display;
	private resultMessage: ResultMessage;
	///private reelLeft: Reel;
	///private reelCenter: Reel;
	///private reelRight: Reel;
	private reels: Reels;
	private stopBtns: StopBtns;
	///private stopBtnLeft: StopBtn;
	///private stopBtnCenter: StopBtn;
	///private stopBtnRight: StopBtn;
	private replayBtn: ReplayBtn;
	public static stopCount: number;
	
	constructor() {
		this.startLever = new StartLever;
		this.display = new Display;
		this.resultMessage = new ResultMessage;
		///this.stopBtnLeft = new StopBtn("btn-left");
		///this.stopBtnCenter = new StopBtn("btn-center");
		///this.stopBtnRight = new StopBtn("btn-right");
		///this.reelLeft = new Reel("items-left");
		///this.reelCenter = new Reel("items-center");
		///this.reelRight = new Reel("items-right");
		this.reels = new Reels;
		this.stopBtns = new StopBtns(this.reels.stop);
		this.replayBtn = new ReplayBtn('replay-btn', this.reset);
		this.run();
		this.judge();
	}
	private run() {
		if(SlotMachine.isPlaying) {
			////this.reelLeft = new Reel("items-left", this.stopBtnLeft);このコンストラクタ内でprivateのmoveを実行するかもしれん
			///this.reelLeft.move();
			///this.reelCenter.move();
			///this.reelRight.move();
			this.reels.move();
		}
	}
	judge() {
		if (Reels.stopCount >= 3) {
			Reels.stopCount = 0;//3つのリールが止まったのでリセット
			this.replayBtn.show();//リプレイボタンを表示
			//真ん中横1行全て7が揃ったら「Great!!!!!」
			/*
			let horizontalCount = 0;
			let upperLeftCount = 0;
			let upperRightCount = 0;

			for(let i = 0; i < this.reels.reels.length; i++) {
				for(let j = 0; j < this.reels.reels.length; j++) {
					if(this.reels.reels[j].items[0][2] == '<span class="seven color-orange">7</span>') {
						horizontalCount++;
					}
				}
				for(let j = 0; j < this.reels.reels.length; j++) {
					if(this.reels.reels[j].items[0][j + 1] == '<span class="seven color-orange">7</span>') {
						upperLeftCount++;
					}
				}
				for(let j = this.reels.reels.length; j > 0; j--) {
					if(this.reels.reels[this.reels.reels.length - j].items[0][j] == '<span class="seven color-orange">7</span>') {
						upperRightCount++;
					}
				}
				if(horizontalCount == this.reels.reels.length || upperLeftCount == this.reels.reels.length || upperRightCount == this.reels.reels.length) {
					this.resultMessage.isGreat;
				}
			}
			*/
			if (
				this.reels.elems[0].items[0][2].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[1].items[0][2].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[2].items[0][2].innerHTML == '<span class="seven color-orange">7</span>' ||
				this.reels.elems[0].items[0][1].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[1].items[0][2].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[2].items[0][3].innerHTML == '<span class="seven color-orange">7</span>' ||
				this.reels.elems[0].items[0][3].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[1].items[0][2].innerHTML == '<span class="seven color-orange">7</span>' &&
				this.reels.elems[2].items[0][1].innerHTML == '<span class="seven color-orange">7</span>'
			) {
				this.resultMessage.isGreat;
			} 
			//7以外で真ん中横1行or左斜め上or右斜め上が揃ったら
			else if (
				(this.reels.elems[0].items[0][2].innerHTML == this.reels.elems[1].items[0][2].innerHTML &&
					this.reels.elems[1].items[0][2].innerHTML == this.reels.elems[2].items[0][2].innerHTML) ||
				(this.reels.elems[0].items[0][1].innerHTML == this.reels.elems[1].items[0][2].innerHTML &&
					this.reels.elems[1].items[0][2].innerHTML == this.reels.elems[2].items[0][3].innerHTML) ||
				(this.reels.elems[0].items[0][3].innerHTML == this.reels.elems[1].items[0][2].innerHTML &&
					this.reels.elems[1].items[0][2].innerHTML == this.reels.elems[2].items[0][1].innerHTML)
			) {
				this.resultMessage.isGood;
			} 
			//何も揃っていなければ
			else {
				this.resultMessage.isRegret;
			}
		}
	}
	reset() {
		this.display.reset();
		this.resultMessage.empty();
		this.startLever.reset();
		this.replayBtn.hide();//リプレイボタンを非表示
		this.resultMessage.hide();//結果のメッセージを非表示
		SlotMachine.isPlaying = false;//レバーの操作を可能にする
	}
}
