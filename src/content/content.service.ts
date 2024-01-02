import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Content } from './content.model';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import {faker} from "@faker-js/faker"
@Injectable()
export class ContentService {
    constructor(@InjectModel(Content.name) private contentModel: Model<Content>,private readonly elasticSearchService: ElasticsearchService){}

    async createFakeData(): Promise<void> {
        try {
          await this.contentModel.deleteMany({});
    
          const sampleData = [];
          for (let i = 0; i < 250; i++) {
            sampleData.push({
              title: faker.helpers.arrayElement(["Introduction to Maths", "Introduction to Chemistry", "Introduction to Physics"]),
              description: faker.lorem.sentence(),
              tags: ["Maths", "Chemistry" , "Physics"],
              gradeLevel: faker.helpers.rangeToNumber({min:1, max:12}),
              minDuration: faker.helpers.rangeToNumber({min:1, max:60}),
              maxDuration: faker.helpers.rangeToNumber({min:61, max:120}),
              priority: faker.helpers.arrayElement([true,false]),
            });
          }
          await this.contentModel.insertMany(sampleData);
    
          console.log('Sample data has been populated in MongoDB.');
        } catch (error) {
            throw new Error(error);
        }
      }

      async indexBulkData(){
        try {
          const contents = await this.contentModel.find().exec();
    

          const operations = []
          for (const content of contents) {
            operations.push({ index: { _index: 'content_index' } },
            {
              title: content?.title,
              description: content?.description,
              tags: content?.tags,
              gradeLevel: content?.gradeLevel,
              minDuration: content?.minDuration,
              maxDuration: content?.maxDuration,
              priority: content?.priority,
            },)
          }
          const response = await this.elasticSearchService.bulk({
            operations : operations
          })
          
          return response
        } catch (error) {
            throw new Error(error);
        }
      }


      async getAllDataFromMongo(): Promise<Content[]> {
        try {
          return await this.contentModel.find().exec();
        } catch (error) {
          throw new Error(error);
        }
      }

      async getAllDataFromElasticsearch() {
        try {
          const body  = await this.elasticSearchService.search<any>({
            index: 'content_index', 
          });
    
          return body.hits.hits
        } catch (error) {
          throw new Error(error);
        }
      }

      async searchContentElasticsearch(
        query: string,
        gradeLevel: number = 0,
        minDuration: number = 0,
        maxDuration: number = Number.MAX_SAFE_INTEGER,
        pageSize: number = 100,
      ): Promise<SearchResponse<Record<string, any>>> {
      
        try {
          const mustQueries = [
            {
              multi_match: {
                query: query,
                fields: ["title", "description", "tags"],
              },
            },
            {
              range: {
                minDuration: {
                  gte: minDuration,
                },
              },
            },
            {
              range: {
                maxDuration: {
                  lte: maxDuration || Number.MAX_SAFE_INTEGER,
                },
              },
            },
            
          ];
      
       
      
          const body = await this.elasticSearchService.search({
            index: 'content_index',
            body: {
              size: pageSize,
              query: {
                bool: {
                  must: mustQueries,
                  filter:[
                    {
                        term:{
                            gradeLevel:gradeLevel
                        }
                    }
                  ]
                },
              },
              sort:[
                {
                    priority: {
                      order: 'desc', 
                    },
                  },
              ]
            },
          });
      
          return body;
        } catch (error) {
            throw new Error(error);
        }
      }
      
      async searchContentMongoDB(
        query: string,
        gradeLevel: number,
        minDuration: number,
        maxDuration: number,
        pageSize: number,
      ): Promise<Content[]> {
        try {
          const filter = {
            $and: [
              {
                $or: [
                  { title: { $regex: query, $options: 'i' } },
                  { description: { $regex: query, $options: 'i' } },
                  { tags: { $in: query.split(',') } },
                ],
              },
              {
                gradeLevel: gradeLevel ? gradeLevel : { $gte: 1, $lte: 12 },
                minDuration: { $gte: minDuration || 0 },
                maxDuration: { $lte: maxDuration || Number.MAX_SAFE_INTEGER },
              },
            ],
          };
    
          const options = {
            
            limit: pageSize,
          };
    
          const result = await this.contentModel.find(filter, null, options).sort({priority:-1}).exec();;
          return result;
        } catch (error) {
            throw new Error(error);
        }
      }
}
