export class Server {
    _name: string;
    _port: number;

    constructor(name: string, port: number) {
        this._name = name;
        this._port = port;
    }

    get name(): string {
        return this._name;
    }
    get port(): number {
        return this._port;
    }
    set name(name) {
        this._name = name;
    }
    set port(port) {
        this._port = port;
    }
}
