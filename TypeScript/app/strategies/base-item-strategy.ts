import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';
import {Item} from '../models/item';
import {ItemStrategyConfig} from './item-strategy-config';
import {StrategyHelper} from './strategy-helper';

export class BaseItemStrategy implements ItemUpdateStrategy {
	constructor(public readonly item: Item) {
	}

	public UpdatedItem(): Item {
		const itemWithSellInUpdated = StrategyHelper.itemWithSellIn(this.item.sellIn - 1, this.item);
		const defaultUpdateAmount = itemWithSellInUpdated.sellIn >= 0 ? ItemStrategyConfig.qualityDegradation : ItemStrategyConfig.qualityDegradation * 2;
		const itemWithSellInAndQualityUpdated = StrategyHelper.itemWithQuality(itemWithSellInUpdated.quality - defaultUpdateAmount, itemWithSellInUpdated);
		return StrategyHelper.applyLimits(itemWithSellInAndQualityUpdated);
	}
}
