import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

export interface IEntity {
  name: string;
  tableName: string;
  order: number;
}

@Injectable()
export class LoaderService {
  connectionManager: EntityManager;
  constructor(private dataSource: DataSource) {
    this.connectionManager = this.dataSource.createEntityManager();
  }

  async load(entities: IEntity[], fixturesTree): Promise<void> {
    for (const entity of entities.sort((a, b) => a.order - b.order)) {
      try {
        const repository = this.connectionManager.getRepository(entity.name);
        const items = fixturesTree[entity.name];

        await repository
          .createQueryBuilder(entity.name)
          .insert()
          .values(items)
          .execute();
      } catch (error) {
        throw new Error(
          `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
        );
      }
    }
  }

  async getEntities(fixturesTree): Promise<IEntity[]> {
    const entities = [];
    this.connectionManager.connection.entityMetadatas.forEach((entity) => {
      entities.push({
        name: entity.name,
        tableName: entity.tableName,
        order: this.getOrder(entity.name, fixturesTree),
      });
    });
    return entities;
  }

  getOrder(entityName: string, fixturesTree): number {
    return Object.keys(fixturesTree).indexOf(entityName);
  }

  entitiesWithFixtures(entities, fixturesTree) {
    return entities.filter(
      (entity) => Object.keys(fixturesTree).indexOf(entity.name) !== -1,
    );
  }

  async loadFixtures(fixturesTree) {
    const entities = await this.getEntities(fixturesTree);
    const entitiesWithFixtures = this.entitiesWithFixtures(
      entities,
      fixturesTree,
    );
    await this.load(entitiesWithFixtures, fixturesTree);
  }

  async dropFixtures() {
    await this.dataSource.getRepository('PlayerEntity').delete({});
  }
}
