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
        public _name: string;
        public _photo: string;
        public _sexo: string;
        public _id: number;

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
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><RowLimit>20</RowLimit></View>');

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
                        return resolve(result);
                    },
                    function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
            });           
        }

        getData(id: number): Promise<superHeroes>{
         
            var list: SP.List = this._web.get_lists().getByTitle("SuperHeroes");
            var listItem: SP.ListItem = list.getItemById(id);
            this._context.load(listItem);
            var context = this._context;
            return new Promise<superHeroes>(function (resolve: any, reject: any) {
                context.executeQueryAsync(
                    function () {
                       
                        return resolve(
                            new superHeroes(listItem.get_id(), listItem.get_item("Title"), listItem.get_item('Photo'), listItem.get_item('Sexo'))
                            );
                    },
                    function () {
                        console.log("Error al consultar la lista de Sharepoint");
                        return reject("error");
                    });
            });    
        }

        addData(item: superHeroes): Promise<boolean> {
            var list: SP.List = this._web.get_lists().getByTitle("SuperHeroes");
            var itemCreateInfo: SP.ListItemCreationInformation = new SP.ListItemCreationInformation();
            var newItem:SP.ListItem = list.addItem(itemCreateInfo);
            newItem.set_item("Title", item._name);
            newItem.set_item("Photo", item._photo);
            newItem.update();
            this._context.load(newItem);
            var context = this._context;
            return new Promise<boolean>(function (resolve: any, reject: any) {

                context.executeQueryAsync(function (data) {
                    alert("Elemento insertado");
                    return resolve(true);
                }, function (error) {
                    return reject(false);
                    alert("Error al instertar un elemento");
                    alert(error);
                });
            });

        }

    }
}