define(["require", "exports", "services/superheroesservices", "mustache"], function (require, exports, marvel, mustache) {
    var item = new marvel.superHeroes.marvel();
    function run() {
        loadData();
        $("#btnAdd").click(function () {
            $("#templates").load("../Scripts/app/view/addsuperheroes.html", function () {
                var template = $('#templates').html();
                var data;
                var html = mustache.render(template, data);
                $('#message').html(html);
                $('#templates').html('');
                $('#btnSaveSuperHeroes').click(function () {
                    var superHeroe = new marvel.superHeroes.superHeroes(0, $("#Title").val(), $("#Imagen").val(), "");
                    item.addData(superHeroe).then(function () {
                        loadData();
                    });
                });
            });
        });
    }
    exports.run = run;
    function loadId(id) {
        var element = item.getData(id).then(function (data) {
            $("#templates").load("../Scripts/app/view/editsuperheroes.html", function () {
                var template = $('#templates').html();
                var html = mustache.render(template, data);
                $('#message').html(html);
                $('#templates').html('');
                $('#btnEditSuperHeroes').click(function () {
                    var superHeroe = new marvel.superHeroes.superHeroes($("#Id").val(), $("#Title").val(), $("#Imagen").val(), "");
                    item.editData(superHeroe).then(function () {
                        loadData();
                    });
                });
            });
        });
    }
    exports.loadId = loadId;
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
});
