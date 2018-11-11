import { maxBy } from 'lodash';

/**
 * Represents a storable object in a database
 */
export interface Entity {
    id: number;
}

/**
 * Returns the next Id available given an array of entities
 * @param entities The array of entities
 */
export function nextId(entities: Entity[]): number {
    const entity = maxBy(entities, (entity) => entity.id);
    if (entity) {
        return entity.id + 1;
    } else {
        return 1;
    }
}
