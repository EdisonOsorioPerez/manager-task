import { ConflictException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class CrudModel<T extends Document> {
  constructor(protected readonly crudModel: Model<T>) {}

  async findById(id: string): Promise<T> {
    return await this.crudModel.findById({ _id: id }).catch(() => {
      throw new ConflictException('No se pudo realizar la acción');
    });
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return await this.crudModel.findOne(filter).catch(() => {
      throw new ConflictException('No se pudo crear el registro en la db');
    });
  }

  async find(filter: FilterQuery<T>) {
    return await this.crudModel.find(filter).catch(() => {
      throw new ConflictException('No se pudo crear el registro en la db');
    });
  }

  async create(data: any): Promise<any> {
    return await this.crudModel.create(data).catch(() => {
      throw new ConflictException('No se pudo crear el registro en la db');
    });
  }

  async update(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<any> {
    return await this.crudModel.findOneAndUpdate(filter, data).catch((erro) => {
      throw new ConflictException('No se pudo realizar la acción en la db');
    });
  }

  async delete(data: any): Promise<any> {
    return await data.deleteOne().catch((err) => {
      throw new ConflictException('No se pudo realizar la acción en la db');
    });
  }
}
