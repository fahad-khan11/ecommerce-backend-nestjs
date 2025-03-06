import { CategorEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config(); 

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  
  logging: false,
  entities: [CategorEntity, UserEntity],  
  migrations: ['dist/db/migration/*{.js}'], 
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
