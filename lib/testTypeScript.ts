import * as Joi from "../node_modules/joi";
// Should not be necessary to specify folder

export class BananaSuper {
    banana(s: string) {
        return "Banana" + " " + s;
    }
}
