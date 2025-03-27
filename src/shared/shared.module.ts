import { Global, Module } from '@nestjs/common';
import { I18nModule, QueryResolver, HeaderResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '..', 'i18n'),
                watch: true
            },
            
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
                new HeaderResolver(['x-lang']),
            ]
        })
    ],
    providers: [],
    exports: [I18nModule],
})
export class SharedModule {}
