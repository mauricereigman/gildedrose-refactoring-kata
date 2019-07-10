import {Item} from '../models/item';

export interface ItemUpdateStrategy {
	UpdatedItem(): Item;
}
