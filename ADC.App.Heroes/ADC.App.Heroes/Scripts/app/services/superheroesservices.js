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
                var camlQuery = new SP.CamlQuery();
                camlQuery.set_viewXml('<View><RowLimit>20</RowLimit></View>');
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
                        return resolve(result);
                    }, function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
                });
            };
            marvel.prototype.getData = function (id) {
                var list = this._web.get_lists().getByTitle("SuperHeroes");
                var listItem = list.getItemById(id);
                this._context.load(listItem);
                var context = this._context;
                return new Promise(function (resolve, reject) {
                    context.executeQueryAsync(function () {
                        return resolve(new superHeroes(listItem.get_id(), listItem.get_item("Title"), listItem.get_item('Photo'), listItem.get_item('Sexo')));
                    }, function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
                });
            };
            marvel.prototype.addData = function (item) {
                var list = this._web.get_lists().getByTitle("SuperHeroes");
                var itemCreateInfo = new SP.ListItemCreationInformation();
                var newItem = list.addItem(itemCreateInfo);
                newItem.set_item("Title", item._name);
                newItem.set_item("Photo", item._photo);
                newItem.update();
                this._context.load(newItem);
                var context = this._context;
                return new Promise(function (resolve, reject) {
                    context.executeQueryAsync(function (data) {
                        alert("Elemento insertado");
                        return resolve(true);
                    }, function (error) {
                        return reject(false);
                        alert("Error al instertar un elemento");
                        alert(error);
                    });
                });
            };
            return marvel;
        })();
        superHeroes_1.marvel = marvel;
    })(superHeroes = exports.superHeroes || (exports.superHeroes = {}));
});
