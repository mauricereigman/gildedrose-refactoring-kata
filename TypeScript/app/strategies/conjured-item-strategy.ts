import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';
import {Item} from '../models/item';
import {ItemStrategyConfig} from './item-strategy-config';
import {StrategyHelper} from './strategy-helper';

export class ConjuredItemStrategy implements ItemUpdateStrategy {
	constructor(public readonly item: Item) {
	}

	public UpdatedItem(): Item {
		const itemWithSellInUpdated = StrategyHelper.itemWithSellIn(this.item.sellIn - 1, this.item);
		const qualityDegradation = this.item.quality > 0 ? ItemStrategyConfig.qualityDegradation * 2 : ItemStrategyConfig.qualityDegradation;
		const itemWithSellInAndQualityUpdated = StrategyHelper.itemWithQuality(qualityDegradation, itemWithSellInUpdated);
		return StrategyHelper.applyLimits(itemWithSellInAndQualityUpdated);
	}
}
