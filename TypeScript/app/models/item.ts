
export class Item {
	public name: string;
	public sellIn: number;
	public quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}
