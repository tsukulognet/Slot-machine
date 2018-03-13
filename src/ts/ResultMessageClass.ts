export default class ResultMessage {
	private elem: HTMLElement;
	constructor() {
		this.elem = document.getElementById('result-message');
		this.hide();
	}
	//結果のメッセージの非表示
	public hide() {
		this.elem.classList.remove("result-zoom");
	}
	//結果のメッセージの表示	
	public show() {
		this.elem.classList.add("result-zoom");
	}
	get isGreat() {
		this.show();
		return this.elem.textContent = "Great!!!";
	}
	get isGood() {
		this.show();
		return this.elem.textContent = "Good!";
	}
	get isRegret() {
		this.show();
		return this.elem.textContent = "Regret...";
	}
	empty() {
		this.elem.textContent = "";
	}
}
