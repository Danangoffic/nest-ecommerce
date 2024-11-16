import { Controller, Get, Header, Query, Req } from '@nestjs/common';
import { query, Request } from 'express';


@Controller('api/users')
export class UserController {
    @Get("/:loginName")
    getByLoginName(@Req() request: Request): string{
        return `get user by login name with : ${request.params.loginName}`;
    }

    @Get()
    getData(@Query("name") name: string, @Query("age") age: number): string{
        console.log("melakukan pencarian user dengan query :",name);
        console.log("melakukan pencarian user dengan query :",age);
        return `melakukan pencarian user dengan query : ${name}<br> melakukan pencarian user dengan query age : ${age}`;
    }

    @Get("header")
    @Header("Content-type", "text/html")
    getHeaderData(@Req() req: Request): string {
        const authHeader = req.headers['authorization'];
        console.log("Authorization Header:", authHeader);
        return `Authorization Header: ${authHeader}`;
    }
}

