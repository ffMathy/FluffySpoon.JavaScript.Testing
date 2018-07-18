export declare abstract class ProxyPropertyContextBase {
    name: string;
    mimicks: Function | Object;
    type: 'function' | 'object';
    constructor();
}
export declare class ProxyPropertyContext extends ProxyPropertyContextBase {
    type: 'object';
    returnValues: any[];
    constructor();
    promoteToMethod(): ProxyMethodPropertyContext;
}
export declare class ProxyMethodPropertyContext extends ProxyPropertyContextBase {
    method: ProxyMethodContext;
    type: 'function';
    constructor();
}
export declare class ProxyMethodContext {
    arguments: any[];
    returnValues: any[];
    constructor();
}
export declare class ProxyCallRecords {
    expected: ProxyExpectation;
    actual: ProxyCallRecord[];
    constructor();
}
export declare class ProxyExpectation {
    callCount: number;
    negated: boolean;
    propertyName: string;
    arguments: Array<any>;
    constructor();
}
export declare class ProxyObjectContext {
    property: ProxyPropertyContext | ProxyMethodPropertyContext;
    calls: ProxyCallRecords;
    constructor();
    setExpectations(count: number, negated: boolean): void;
    findActualPropertyCalls(propertyName: string): ProxyCallRecord[];
    findActualMethodCalls(propertyName: string, args: any[]): ProxyCallRecord[];
    getLastCall(): ProxyCallRecord;
    addActualPropertyCall(): void;
}
export declare class ProxyCallRecord {
    callCount: number;
    property: ProxyPropertyContext | ProxyMethodPropertyContext;
    constructor(property?: ProxyPropertyContext | ProxyMethodPropertyContext);
}
