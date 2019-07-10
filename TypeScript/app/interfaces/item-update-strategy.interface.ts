import {Item} from '../models/item';

export interface ItemUpdateStrategy {
	readonly item: Item;

	UpdatedItem(): Item;
}
