define(["require", "exports", "toastr"], function (require, exports, toastr) {
    var Function;
    (function (Function) {
        (function (TypeAlert) {
            TypeAlert[TypeAlert["Alert"] = 0] = "Alert";
            TypeAlert[TypeAlert["Console"] = 1] = "Console";
            TypeAlert[TypeAlert["Toast"] = 3] = "Toast";
        })(Function.TypeAlert || (Function.TypeAlert = {}));
        var TypeAlert = Function.TypeAlert;
        var Logger = (function () {
            function Logger(name) {
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
            Logger.prototype.showMessage = function (message) {
                if (this.name === TypeAlert.Alert) {
                    alert(message);
                }
                if (this.name === TypeAlert.Console) {
                    console.info(message);
                }
                if (this.name === TypeAlert.Toast) {
                    toastr.info(message);
                }
            };
            Logger.prototype.infoMessage = function (message) {
                if (this.name === TypeAlert.Alert) {
                    alert(message);
                }
                if (this.name === TypeAlert.Console) {
                    console.info(message);
                }
                if (this.name === TypeAlert.Toast) {
                    toastr.info(message);
                }
            };
            Logger.prototype.warningMessage = function (message) {
                if (this.name === TypeAlert.Alert) {
                    alert(message);
                }
                if (this.name === TypeAlert.Console) {
                    console.warn(message);
                }
                if (this.name === TypeAlert.Toast) {
                    toastr.warning(message);
                }
            };
            Logger.prototype.errorMessage = function (message) {
                if (this.name === TypeAlert.Alert) {
                    alert(message);
                }
                if (this.name === TypeAlert.Console) {
                    console.error(message);
                }
                if (this.name === TypeAlert.Toast) {
                    toastr.error(message);
                }
            };
            return Logger;
        })();
        Function.Logger = Logger;
    })(Function = exports.Function || (exports.Function = {}));
});
