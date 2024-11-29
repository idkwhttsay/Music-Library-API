import { DataSource } from 'typeorm';
import typeORMConfig from './typeorm.config';

export default new DataSource(typeORMConfig);
