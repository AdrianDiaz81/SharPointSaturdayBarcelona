/// <reference path="../typings/mustache/mustache.d.ts" />
import marvel = require("superheroes/superheroes");
import mustache = require("mustache");
    export function run() {
        var item: marvel.superHeroes.marvel = new marvel.superHeroes.marvel();
        var heroes = item.getHeroes().then(function (data) {   
            if (data.length > 0) {
                
                $("#templates").load("../Scripts/app/superheroes/superheroes.html", function () {
                    var template = $('#templates').html();

                    var html = mustache.render(template, data);
                    $('#message').html(html);
                });
            }
            else {
                $('#message').text("No hay datos de ningún Superheroe");
            }
        });
          }

