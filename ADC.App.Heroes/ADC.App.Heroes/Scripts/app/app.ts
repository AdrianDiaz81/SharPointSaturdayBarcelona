/// <reference path="../typings/mustache/mustache.d.ts" />
import marvel = require("services/superheroesservices");
import mustache = require("mustache");
var item: marvel.superHeroes.marvel = new marvel.superHeroes.marvel();

    export function run() {
     
        loadData();

        $("#btnAdd").click(function () {
            $("#templates").load("../Scripts/app/view/addsuperheroes.html", function () {
                var template = $('#templates').html();
                var data: any;
                var html = mustache.render(template,  data);
                $('#message').html(html);
                $('#templates').html('');              
                $('#btnSaveSuperHeroes').click(function () {                               
                    var superHeroe: marvel.superHeroes.superHeroes = new marvel.superHeroes.superHeroes(0, $("#Title").val(), $("#Imagen").val(), "");
                    item.addData(superHeroe).then(function () {
                        loadData();
                    });
                });
            });          
        });
}

    export function loadId(id: number) {
        var element = item.getData(id).then(function (data) {
            $("#templates").load("../Scripts/app/view/editsuperheroes.html", function () {
                var template = $('#templates').html();
                var html = mustache.render(template, data);
                $('#message').html(html);
                $('#templates').html(''); 
                $('#btnEditSuperHeroes').click(function () {                  
                   var superHeroe: marvel.superHeroes.superHeroes = new marvel.superHeroes.superHeroes($("#Id").val(), $("#Title").val(), $("#Imagen").val(), "");
                    item.editData(superHeroe).then(function () {
                        loadData();
                    });
                });
            });
        });
    }

    function loadData() {
        var heroes = item.getHeroes().then(function (data) {
            if (data.length > 0) {

                $("#templates").load("../Scripts/app/view/listsuperheroes.html", function () {
                    var template = $('#templates').html();

                    var html = mustache.render(template, data);
                    $('#message').html(html);
                    $('#templates').html('');
                    var element = $('.divPicture a');
                    for (var i = 0; i < element.length; i++) {
                        var itemEnlace = element[i];
                        var id = itemEnlace.getAttribute("name");
                        $('.divPicture a#' + id).click(function () {
                            var that = this;
                            loadId(parseInt(that.id));
                        });


                    }

                });
            }
            else {
                $('#message').text("No hay datos de ningún Superheroe");
            }
        });
    }



  