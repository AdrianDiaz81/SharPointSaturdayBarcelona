export module Function {
    interface IAlerter {
        name: string;
        showMessage(): void;
        infoMessage(): void;
        warningMessage(): void;
    }
}