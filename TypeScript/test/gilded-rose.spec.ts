import {expect} from 'chai';
import {GildedRose} from '../app/models/gilded-rose';
import {Item} from '../app/models/item';

describe('Gilded Rose', () => {
    describe('itemsWithQualityUpdated', () => {
        it('should update an item', () => {
            const gildedRose = new GildedRose([new Item('foo', 100, 10)]);
            const updatedItems = gildedRose.itemsWithQualityUpdated();
            expect(updatedItems[0].name).to.equal('foo');
            expect(updatedItems[0].sellIn).to.equal(99);
            expect(updatedItems[0].quality).to.equal(9);
        });

        it('should degrade items with passed sell in date twice as fast', () => {
            const gildedRose = new GildedRose([
                new Item('foo', 10, 30),
                new Item('bar', 5, 50)
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(20);
            expect(updatedItems[0].quality).to.equal(0);
            expect(updatedItems[1].quality).to.equal(15);
        });

        it('should NOT degrade items to negative values', () => {
            const gildedRose = new GildedRose([
                new Item('foo', 10, 30),
                new Item('bar', 5, 100)
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(21);
            expect(updatedItems[0].quality).to.equal(0);
        });

        it('should never increase an items quality to exceed 50', () => {
            const gildedRose = new GildedRose([
                new Item('Aged Brie', 10, 30),
                new Item('Sulfuras, Hand of Ragnaros', 10, 30),
                new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30),]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(100);
            expect(updatedItems[0].quality).to.equal(50);
            expect(updatedItems[0].quality > 50).not.to.equal(true);
        });

        it('should never increase/decrease an items quality or update sellIn when the items name is "Sulfuras, Hand of Ragnaros"', () => {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 30),]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(100);
            expect(updatedItems[0].quality).to.equal(30);
        });

        it('should increase quality by 2 when item name is "Backstage passes to a TAFKAL80ETC concert" or "Aged Brie" and sellIn days remaining are 10 or less and more than 5',  () =>  {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10),
                new Item('Aged Brie', 9, 10),
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(1);
            expect(updatedItems[0].quality).to.equal(12);
        });

        it('should increase quality by 3 when item name is "Backstage passes to a TAFKAL80ETC concert" or "Aged Brie" and sellIn days remaining are 5 or less',  () =>  {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
                new Item('Aged Brie', 5, 10)
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(1);
            expect(updatedItems[0].quality).to.equal(13);
        });

        it('should increase quality by 2 when item name is "Backstage passes to a TAFKAL80ETC concert" or "Aged Brie" and sellIn days remaining are 6',  () =>  {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10),
                new Item('Aged Brie', 6, 10)
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(1);
            expect(updatedItems[0].quality).to.equal(12);
        });

        it('should increase quality by 1 when item name is "Backstage passes to a TAFKAL80ETC concert" or "Aged Brie" and sellIn days remaining are 11',  () =>  {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10),
                new Item('Aged Brie', 11, 10)
            ]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(1);
            expect(updatedItems[0].quality).to.equal(11);
        });

        it('should degrade Conjured item quality twice as fast as a normal item',  () =>  {
            const gildedRose = new GildedRose([new Item('Conjured', 20, 10),]);
            const updatedItems = gildedRose.itemsWithQualityUpdated(4);
            expect(updatedItems[0].quality).to.equal(2);
        });
    });
});
