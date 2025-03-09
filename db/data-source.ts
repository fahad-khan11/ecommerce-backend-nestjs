import { UserEntity } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ShippingEntity } from 'src/orders/entities/Shipping.entity';
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
  entities: [UserEntity, CategoryEntity, ProductEntity,ReviewEntity,OrderEntity,ShippingEntity],
  // Use the compiled migration files in dist folder to avoid duplicates.
  migrations: [process.cwd() + '/dist/db/migration/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
