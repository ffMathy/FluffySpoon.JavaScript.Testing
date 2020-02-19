import { AllArguments } from "./Arguments";

export type NoArgumentFunctionSubstitute<TReturnType> =
    (() => (TReturnType & NoArgumentMockObjectMixin<TReturnType>))

export type FunctionSubstitute<TArguments extends any[], TReturnType> =
    ((...args: TArguments) => (TReturnType & MockObjectMixin<TArguments, TReturnType>)) &
    ((allArguments: AllArguments) => (TReturnType & MockObjectMixin<TArguments, TReturnType>))

export type PropertySubstitute<TReturnType> = (TReturnType & Partial<NoArgumentMockObjectMixin<TReturnType>>);

type BaseMockObjectMixin<TReturnType> = {
    returns: (...args: TReturnType[]) => void;
    throws: (exception: any) => void;
}

type NoArgumentMockObjectMixin<TReturnType> = BaseMockObjectMixin<TReturnType> & {
    mimicks: (func: () => TReturnType) => void;
}

type MockObjectMixin<TArguments extends any[], TReturnType> = BaseMockObjectMixin<TReturnType> & {
    mimicks: (func: (...args: TArguments) => TReturnType) => void;
}

export type ObjectSubstitute<T extends Object, K extends Object = T> = ObjectSubstituteTransformation<T> & {
    received(amount?: number): TerminatingObject<K>;
    didNotReceive(): TerminatingObject<K>;
    mimick(instance: T): void;
}

type TerminatingObject<T> = {
    [P in keyof T]:
    T[P] extends () => infer R ? () => void :
    T[P] extends (...args: infer F) => infer R ? (...args: F) => void :
    T[P];
}

type ObjectSubstituteTransformation<T extends Object> = {
    [P in keyof T]:
    T[P] extends (...args: infer F) => infer R ? FunctionSubstitute<F, R> :
    T[P] extends () => infer R ? NoArgumentFunctionSubstitute<R> :
    PropertySubstitute<T[P]>;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type OmitProxyMethods<T extends any> = Omit<T, 'mimick' | 'received' | 'didNotReceive'>;

export type DisabledSubstituteObject<T> = T extends ObjectSubstitute<OmitProxyMethods<infer K>, infer K> ? K : never;
