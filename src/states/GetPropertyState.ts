import { ContextState, PropertyKey } from "./ContextState";
import { Context } from "src/Context";
import { FunctionState } from "./FunctionState";
import { areArgumentsEqual, areArgumentArraysEqual } from "../Utilities";

const Nothing = Symbol();

export class GetPropertyState implements ContextState {
    private returns: any[]|Symbol;
    private mimicks: Function;

    private _callCount: number;
    private _recordedFunctionStates: FunctionState[];

    private get isFunction() {
        return this._recordedFunctionStates.length > 0;
    }

    public get property() {
        return this._property;
    }

    public get callCount() {
        return this._callCount;
    }

    public get recordedFunctionStates() {
        return [...this._recordedFunctionStates];
    }

    constructor(private _property: PropertyKey) {
        this.returns = Nothing;
        this._recordedFunctionStates = [];
        this._callCount = 0;
    }

    apply(context: Context, args: any[]) {
        this._callCount = 0;

        const matchingFunctionState = this._recordedFunctionStates.find(x => areArgumentArraysEqual(x.arguments, args));
        if(matchingFunctionState) {
            // console.log('ex-func');
            return matchingFunctionState.apply(context, args);
        }

        var functionState = new FunctionState(this, ...args);
        context.state = functionState;

        this._recordedFunctionStates.push(functionState);

        // console.log('states', this._recordedFunctionStates);

        return context.apply(args);
    }

    set(context: Context, property: PropertyKey, value: any) {
    }

    get(context: Context, property: PropertyKey) {
        const hasExpectations = context.initialState.hasExpectations;

        if (property === 'then')
            return void 0;

        if(this.isFunction)
            return context.proxy;

        if(property === 'mimicks') {
            return (input: Function) => {
                // console.log('mimicks', input);

                this.mimicks = input;
                this._callCount--;

                context.state = context.initialState;
            }
        }

        if(property === 'returns') {
            if(this.returns !== Nothing)
                throw new Error('The return value for the property ' + this._property.toString() + ' has already been set to ' + this.returns);

            return (...returns: any[]) => {
                // console.log('returns', returns);

                this.returns = returns;
                this._callCount--;

                context.state = context.initialState;
            };
        }

        if(!hasExpectations) {
            this._callCount++;

            if(this.mimicks) {
                // console.log('mim-invoke');
                return this.mimicks.apply(this.mimicks);
            }

            if(this.returns !== Nothing)
                return this.returns[this._callCount-1];
        }

        context.initialState.assertCallCountMatchesExpectations(
            context.initialState.getPropertyStates,
            this.callCount,
            'property',
            this.property,
            []);

        return context.proxy;
    }
}