import { Injectable } from '@nestjs/common';
import bdd from './bdd';

// Définir une interface pour les entités avec un ID
interface EntityWithId {
  id: number;
}

@Injectable()
export class BddService {
  get<Entity>(key: string): Entity[] {
    return bdd[key] as Entity[];
  }

  getById<Entity extends EntityWithId>(
    key: string,
    id: number,
  ): Entity | undefined {
    const entities = bdd[key] as Entity[];

    if (Array.isArray(entities)) {
      return entities.find((entity) => entity.id === id) as Entity;
    }
    return undefined;
  }
}
