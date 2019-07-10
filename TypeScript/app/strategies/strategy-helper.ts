import {Item} from '../models/item';
import {ItemStrategyConfig} from './item-strategy-config';

export abstract class StrategyHelper {
	public static itemWithQuality<T>(quality: number, item: Item): Item {
		return new Item(item.name, item.sellIn, quality);
	}

	public static itemWithSellIn<T>(sellIn: number, item: Item): Item {
		return new Item(item.name, sellIn, item.quality);
	}

	public static applyLimits<T>(item: Item): Item {
		if (item.quality > ItemStrategyConfig.qualityUpperLimit) item = StrategyHelper.itemWithQuality(ItemStrategyConfig.qualityUpperLimit, item);
		else if (item.quality < ItemStrategyConfig.qualityLowerLimit) item = StrategyHelper.itemWithQuality(ItemStrategyConfig.qualityLowerLimit, item);
		return item;
	}
}
