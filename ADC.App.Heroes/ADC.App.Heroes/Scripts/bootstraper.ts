/// <reference path="typings/requirejs/require.d.ts" />
require.config({
    baseUrl: "../Scripts/app",
    shim: {

    },
    paths: {
        'jquery': '../vendor/jquery/jquery-1.9.1',
        'mustache': '../vendor/mustache/mustache'
    }
}); 
require(['app','jquery','mustache'],
    (app: any)=> { app.run(); });