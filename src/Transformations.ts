import { AllArguments } from "./Arguments";

export type NoArgumentFunctionSubstitute<TReturnType> = 
    (() => (TReturnType & NoArgumentMockObjectMixin<TReturnType>))

export type FunctionSubstitute<TArguments extends any[], TReturnType> = 
    ((...args: TArguments) => (TReturnType & MockObjectMixin<TArguments, TReturnType>)) & 
    ((allArguments: AllArguments) => (TReturnType & MockObjectMixin<TArguments, TReturnType>))

export type PropertySubstitute<TReturnType> = TReturnType & Partial<NoArgumentMockObjectMixin<TReturnType>>

type BaseMockObjectMixin<TReturnType> = {
    returns: (...args: TReturnType[]) => void;
}

type NoArgumentMockObjectMixin<TReturnType> = BaseMockObjectMixin<TReturnType> & {
    mimicks: (func: () => TReturnType) => void;
}

type MockObjectMixin<TArguments extends any[], TReturnType> = BaseMockObjectMixin<TReturnType> & {
    mimicks: (func: (...args: TArguments) => TReturnType) => void;
}

export type ObjectSubstitute<T extends Object> = ObjectSubstituteTransformation<T> & {
    received(amount?: number): T;
    mimick(instance: T): void;
}

type ObjectSubstituteTransformation<T extends Object> = {
    [P in keyof T]:
    T[P] extends () => infer R ? NoArgumentFunctionSubstitute<R> :
    T[P] extends (...args: infer F) => infer R ? FunctionSubstitute<F, R> :
    PropertySubstitute<T[P]>;
}