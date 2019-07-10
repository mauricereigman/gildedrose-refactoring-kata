import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';
import {Item} from '../models/item';
import {StrategyHelper} from './strategy-helper';

export class FineAgedFoodStrategy implements ItemUpdateStrategy {
	constructor(public readonly item: Item) {
	}

	public UpdatedItem(): Item {
		const itemWithSellInUpdated = StrategyHelper.itemWithSellIn(this.item.sellIn - 1, this.item);
		const itemWithSellInAndQualityUpdated = StrategyHelper.itemWithQuality(itemWithSellInUpdated.quality + 1, itemWithSellInUpdated);
		return StrategyHelper.applyLimits(itemWithSellInAndQualityUpdated);
	}
}
