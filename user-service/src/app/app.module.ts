import { Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisCacheModule } from '@protaskify/shared/infrastructure/adapter/cache/redis/redis.module';
import { UserDITokens } from './di/UserDITokens';
import { UserRepositoryPort } from '../core/domain/port/persistence/UserRepositoryPort';
import { CreateUserService } from '../core/service/usecase/CreateUserService';
import { NestHttpExceptionFilter } from '@protaskify/shared/api/exception-filter/NestHttpExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
import { UserModel } from '../infrastructure/adapter/persistence/knex/models/user.model';
import { ObjectionUserRepositoryAdapter } from '../infrastructure/adapter/persistence/knex/repository/ObjectionUserRepositoryAdapter';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { HttpJwtStrategy } from '../core/service/auth/passport/HttpJwtStrategy';
import { HttpLocalStrategy } from '../core/service/auth/passport/HttpLocalStrategy';
import { HttpAuthService } from '../core/service/auth/HttpAuthService';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiServerConfig } from '../infrastructure/config/ApiServerConfig';
import knexConfig from '../infrastructure/adapter/persistence/knex/knexfile';
import { AppService } from './app.service';
import { GetUserByUserIdService } from '../core/service/usecase/GetUserByUserIdService';
import { RedisClient } from '@protaskify/shared/infrastructure/adapter/cache/redis/redis.service';

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) =>
      new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUserByUserIdUseCase,
    useFactory: (userRepository: UserRepositoryPort) =>
      new GetUserByUserIdService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

const persistenceProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (databaseService: typeof UserModel, cache: RedisClient) => {
      const objectionUserRepository = new ObjectionUserRepositoryAdapter(
        databaseService,
        cache
      );
      return objectionUserRepository;
    },
    inject: [UserModel, RedisClient],
  },
];

const authProviders: Provider[] = [
  HttpAuthService,
  HttpLocalStrategy,
  HttpJwtStrategy,
];

const authModules = [
  PassportModule,
  JwtModule.register({
    secret: ApiServerConfig.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: `${ApiServerConfig.ACCESS_TOKEN_TTL_IN_MINUTES}m`,
    },
  }),
];

@Module({
  controllers: [AppController],
  imports: [
    ObjectionModule.forFeature([UserModel]),
    ObjectionModule.register({
      config: knexConfig,
    }),
    RedisCacheModule,
    ...authModules,
  ],
  providers: [
    ...useCaseProviders,
    ...persistenceProviders,
    ...authProviders,
    AppService,
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
