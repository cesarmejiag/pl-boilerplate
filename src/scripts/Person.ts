class Person {
    private _name: string;
    private _lastname: string;

    constructor(name: string, lastname: string) {
        this._name = name;
        this._lastname = lastname;
    }

    greetings() {
        return `Hello i'm ${this._name} ${this._lastname}`
    }
}

export default Person