import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';
import {Item} from '../models/item';

export class SpecialItemStrategy implements ItemUpdateStrategy {
	constructor(public readonly item: Item) {
	}

	public UpdatedItem(): Item {
		return new Item(this.item.name, this.item.sellIn, this.item.quality);
	}
}
