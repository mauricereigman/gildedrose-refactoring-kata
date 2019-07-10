import {Item} from './item';
import {ItemStrategyFactory} from '../factories/item-strategy-factory';

export class GildedRose {
	constructor(public readonly items: Item[]) {
	}

	public itemsWithQualityUpdated(days: number = 1): Item[] {
		return [...new Array(days)].reduce((prev) => GildedRose.itemsWithQualityUpdated(prev), this.items);
	}

	private static itemsWithQualityUpdated(items: Item[]): Item[] {
		return items
			.map(item => ItemStrategyFactory
				.create(item)
				.UpdatedItem());
	}
}
