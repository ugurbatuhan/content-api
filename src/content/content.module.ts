import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from 'src/content/content.model';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
    ElasticsearchModule.register({ node: 'http://elasticsearch:9200' }),],
    controllers:[ContentController],
    providers:[ContentService]
})
export class ContentModule {}
