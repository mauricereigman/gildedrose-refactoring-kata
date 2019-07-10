import {ConjuredItemStrategy} from '../strategies/conjured-item-strategy';
import {FineAgedFoodStrategy} from '../strategies/fine-aged-food-strategy';
import {SpecialItemStrategy} from '../strategies/special-item-strategy';
import {Item} from '../models/item';
import {BackstagePassStrategy} from '../strategies/backstage-pass-strategy';
import {BaseItemStrategy} from '../strategies/base-item-strategy';
import {ItemUpdateStrategy} from '../interfaces/item-update-strategy.interface';

export class ItemStrategyFactory {
	public static create(item: Item): ItemUpdateStrategy {
		switch (item.name) {
			case 'Aged Brie':
				return new FineAgedFoodStrategy(item);
			case 'Sulfuras, Hand of Ragnaros':
				return new SpecialItemStrategy(item);
			case 'Backstage passes to a TAFKAL80ETC concert':
				return new BackstagePassStrategy(item);
			case 'Conjured':
				return new ConjuredItemStrategy(item);
			default:
				return new BaseItemStrategy(item);
		}
	}
}
