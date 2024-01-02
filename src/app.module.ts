import { Module } from '@nestjs/common';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ContentModule } from './content/content.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './content/content.model'
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [ContentModule,
    MongooseModule.forRoot('mongodb://mongo:27017/content-search-api'),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200', 
    }),],
  controllers: [ContentController],
  providers: [ContentService],
})
export class AppModule {
  constructor(private readonly contentService: ContentService) {}
  async onApplicationBootstrap() {
    
    await this.contentService.createFakeData();
    setTimeout(async () => {
      await this.contentService.indexBulkData();
    }, 10000); 
  }
}
