define(["require", "exports"], function (require, exports) {
    /// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
    /// <reference path="../../typings/sharepoint/sharepoint.d.ts" />
    var superHeroes;
    (function (superHeroes_1) {
        var superHeroes = (function () {
            function superHeroes(id, name, photo, sexo) {
                this._name = name;
                this._photo = photo;
                this._sexo = sexo;
                this._id = id;
            }
            return superHeroes;
        })();
        superHeroes_1.superHeroes = superHeroes;
        var marvel = (function () {
            function marvel() {
                this._context = SP.ClientContext.get_current();
                this._web = this._context.get_web();
            }
            marvel.prototype.getHeroes = function () {
                var result = new Array();
                var list = this._web.get_lists().getByTitle("SuperHeroes");
                var query = new SP.CamlQuery();
                query.set_viewXml("");
                var camlQuery = new SP.CamlQuery();
                camlQuery.set_viewXml('<View><RowLimit>10</RowLimit></View>');
                var collListItem = list.getItems(camlQuery);
                this._context.load(collListItem);
                var context = this._context;
                return new Promise(function (resolve, reject) {
                    context.executeQueryAsync(function () {
                        var listItemEnumerator = collListItem.getEnumerator();
                        while (listItemEnumerator.moveNext()) {
                            var oListItem = listItemEnumerator.get_current();
                            var itemInfo = new superHeroes(oListItem.get_id(), oListItem.get_item('Title'), oListItem.get_item('Photo'), oListItem.get_item('Sexo'));
                            result.push(itemInfo);
                        }
                        console.info("Estoy en el bueno" + result.length);
                        return resolve(result);
                    }, function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
                });
            };
            marvel.prototype.getData = function () {
                return null;
            };
            return marvel;
        })();
        superHeroes_1.marvel = marvel;
    })(superHeroes = exports.superHeroes || (exports.superHeroes = {}));
});
