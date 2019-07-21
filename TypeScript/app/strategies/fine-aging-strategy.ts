import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';
import {Item} from '../models/item';
import {StrategyHelper} from './strategy-helper';
import {ItemStrategyConfig} from './item-strategy-config';

export class FineAgingStrategy implements ItemUpdateStrategy {
	constructor(public readonly item: Item) {
	}

	public UpdatedItem(): Item {
		const itemWithSellInUpdated = StrategyHelper.itemWithSellIn(this.item.sellIn - 1, this.item);
		const passUpdateAmount = this.item.sellIn <= 10 ?
			this.item.sellIn <= 5 ? ItemStrategyConfig.qualityDegradation * 3 : ItemStrategyConfig.qualityDegradation * 2 :
			ItemStrategyConfig.qualityDegradation;
		const strategyWithSellInItemQualityUpdated = StrategyHelper.itemWithQuality(itemWithSellInUpdated.quality + passUpdateAmount, itemWithSellInUpdated);
		return StrategyHelper.applyLimits(strategyWithSellInItemQualityUpdated);
	}
}
