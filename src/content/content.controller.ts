import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService){}

    @Get('getAllDataFromMongo')
    getAllDataFromMongo(){
        return this.contentService.getAllDataFromMongo()
    }

    @Get('getAllDataFromElasticsearch')
    getAllDataFromElasticsearch(){
        return this.contentService.getAllDataFromElasticsearch()
    }

    @Get('indexBulkData')
    indexBulkData(){
        return this.contentService.indexBulkData()
    }

    @Get('searchContentElasticsearch')
    searchContentElasticsearch(
        @Query('query') query: string,
        @Query('gradeLevel', new DefaultValuePipe(0), ParseIntPipe) gradeLevel: number,
        @Query('minDuration', new DefaultValuePipe(0), ParseIntPipe) minDuration: number,
        @Query('maxDuration', new DefaultValuePipe(Number.MAX_SAFE_INTEGER), ParseIntPipe) maxDuration: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    ){
        return this.contentService.searchContentElasticsearch(
            query,
            gradeLevel,
            minDuration,
            maxDuration,
            pageSize,
        )
    }


    @Get('searchContentMongoDB')
    searchContentMongoDB(
        @Query('query') query: string,
        @Query('gradeLevel', new DefaultValuePipe(0), ParseIntPipe) gradeLevel: number,
        @Query('minDuration', new DefaultValuePipe(0), ParseIntPipe) minDuration: number,
        @Query('maxDuration', new DefaultValuePipe(Number.MAX_SAFE_INTEGER), ParseIntPipe) maxDuration: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    ){
        return this.contentService.searchContentMongoDB(
            query,
            gradeLevel,
            minDuration,
            maxDuration,
            pageSize,
        )
    }

    
    
}
