/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../typings/sharepoint/sharepoint.d.ts" />
export module superHeroes {
    export class superHeroes {
        constructor(id:number,name: string, photo: string, sexo: string) {
            this._name = name;
            this._photo = photo;
            this._sexo = sexo;
            this._id = id;
        }
        private _name: string;
        private _photo: string;
        private _sexo: string;
        private _id: number;

    }

    export class marvel {
        constructor() {
            this._context = SP.ClientContext.get_current();
            this._web = this._context.get_web();
        }
        private _web: SP.Web;
        private _context: SP.ClientContext;

        getHeroes(): Promise<Array<superHeroes>> {
            var result: Array<superHeroes> = new Array<superHeroes>();
            
            var list: SP.List = this._web.get_lists().getByTitle("SuperHeroes");
            var query: SP.CamlQuery = new SP.CamlQuery();
            query.set_viewXml("");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><RowLimit>10</RowLimit></View>');

            var collListItem:SP.ListItemCollection = list.getItems(camlQuery);
            
            
            this._context.load(collListItem);
            var context = this._context;
            return new Promise<Array<superHeroes>>(function (resolve:any, reject:any ) {
                context.executeQueryAsync(
                    function () {
                        var listItemEnumerator = collListItem.getEnumerator();

                        while (listItemEnumerator.moveNext()) {
                            var oListItem: SP.ListItem = listItemEnumerator.get_current();
                            var itemInfo: superHeroes = new superHeroes(oListItem.get_id(), oListItem.get_item('Title'), oListItem.get_item('Photo'), oListItem.get_item('Sexo'));
                            result.push(itemInfo);
                        }
                        console.info("Estoy en el bueno" + result.length);
                        return resolve(result);
                    },
                    function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
            });           
        }

        getData() :Array<superHeroes>{
            return null;
        }

    }
}