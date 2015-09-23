/// <reference path="../../typings/toastr/toastr.d.ts" />
import toastr = require("toastr");
export module Function {
    export enum TypeAlert {
        Alert = 0,
        Console = 1,
        Toast=3

    }

    export    interface IAlerter {
        name: TypeAlert;
        showMessage(message:string): void;
        infoMessage(message:string): void;
        warningMessage(message: string): void;
        errorMessage(message: string): void;
    }
    
    export class Logger implements IAlerter {
        constructor(name: TypeAlert) {
            this.name = name;
          
            if (name === TypeAlert.Toast) {


                toastr.options.closeButton = false;

                toastr.options.positionClass = "toast-top-right";

                toastr.options.showDuration = 300;
                toastr.options.hideDuration = 1000;
                toastr.options.timeOut = 5000;
                toastr.options.extendedTimeOut = 1000;
                toastr.options.showEasing = "swing";
                toastr.options.hideEasing = "linear";
                toastr.options.showMethod = "fadeIn";
                toastr.options.hideMethod = "fadeOut";
            }
        }
        name: TypeAlert;
        showMessage(message:string) {
            if (this.name === TypeAlert.Alert) {
                alert(message);
            }
            if (this.name === TypeAlert.Console) {
                console.info(message);
            }
            if (this.name === TypeAlert.Toast) {
                toastr.info(message);
            }
        }
        infoMessage(message: string) {
            if (this.name === TypeAlert.Alert) {
                alert(message);
            }
            if (this.name === TypeAlert.Console) {
                console.info(message);
            }
            if (this.name === TypeAlert.Toast) {
                toastr.info(message);
            } }
        warningMessage(message: string) {
            if (this.name === TypeAlert.Alert) {
                alert(message);
            }
            if (this.name === TypeAlert.Console) {
                console.warn(message);
            }
            if (this.name === TypeAlert.Toast) {
                toastr.warning(message);
            }
        }
        errorMessage(message: string) {
            if (this.name === TypeAlert.Alert) {
                alert(message);
            }
            if (this.name === TypeAlert.Console) {
                console.error(message);
            }
            if (this.name === TypeAlert.Toast) {
                toastr.error(message);
            }
        }

    }
}