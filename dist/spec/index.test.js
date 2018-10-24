"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var Index_1 = require("../src/Index");
var Dummy = /** @class */ (function () {
    function Dummy() {
    }
    return Dummy;
}());
var Example = /** @class */ (function () {
    function Example() {
        this.a = "1337";
    }
    Example.prototype.c = function (arg1, arg2) {
        return "hello " + arg1 + " world (" + arg2 + ")";
    };
    Object.defineProperty(Example.prototype, "d", {
        get: function () {
            return 1337;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Example.prototype, "v", {
        set: function (x) {
            console.log('define: ' + x);
        },
        enumerable: true,
        configurable: true
    });
    Example.prototype.received = function (stuff) {
    };
    Example.prototype.returnPromise = function () {
        return Promise.resolve(new Dummy());
    };
    Example.prototype.foo = function () {
        return 'stuff';
    };
    return Example;
}());
exports.Example = Example;
var instance;
var substitute;
ava_1.default.beforeEach(function () {
    instance = new Example();
    substitute = Index_1.Substitute.for();
});
// test('class method returns with specific args', t => {
// 	substitute.c("hi", "there").returns("blah", "haha");
// 	t.is(substitute.c("hi", "there"), 'blah');
// 	t.is(substitute.c("hi", "there"), 'haha');
// 	t.is(substitute.c("hi", "there"), void 0);
// 	t.is(substitute.c("hi", "there"), void 0);
// });
// test('returning other fake from promise works', async t => {
// 	const otherSubstitute = Substitute.for<Dummy>();
// 	substitute.returnPromise().returns(Promise.resolve(otherSubstitute));
// 	t.is(otherSubstitute, await substitute.returnPromise());
// });
// test('returning resolved promises works', async t => {
// 	substitute.returnPromise().returns(Promise.resolve(1338));
// 	t.is(1338, await substitute.returnPromise());
// });
ava_1.default('class string field set received', function (t) {
    substitute.v = undefined;
    substitute.v = null;
    substitute.v = 'hello';
    substitute.v = 'hello';
    substitute.v = 'world';
    t.notThrows(function () { return substitute.received(5).v = Index_1.Arg.any(); });
    // t.notThrows(() => substitute.received().v = 'hello');
    // t.notThrows(() => substitute.received().v = Arg.any());
    // t.notThrows(() => substitute.received(2).v = 'hello');
    // t.notThrows(() => substitute.received(2).v = Arg.is(x => x && x.indexOf('ll') > -1));
    // t.throws(() => substitute.received(2).v = Arg.any());
    // t.throws(() => substitute.received(1).v = Arg.any());
    // t.throws(() => substitute.received(1).v = Arg.is(x => x && x.indexOf('ll') > -1));
    // t.throws(() => substitute.received(3).v = 'hello');
});
// test('partial mocks using function mimicks with specific args', t => {
// 	substitute.c('a', 'b').mimicks(instance.c);
// 	t.is<any>(substitute.c('c', 'b'), substitute);
// 	t.is(substitute.c('a', 'b'), 'hello a world (b)');
// });
// test('class method returns with placeholder args', t => {
// 	substitute.c(Arg.any(), "there").returns("blah", "haha");
// 	t.is(substitute.c("hi", "there"), 'blah');
// 	t.is<any>(substitute.c("hi", "the1re"), substitute);
// 	t.is(substitute.c("his", "there"), 'haha');
// 	t.is<any>(substitute.c("his", "there"), void 0);
// 	t.is<any>(substitute.c("hi", "there"), void 0);
// });
// test('class void returns', t => {
// 	substitute.foo().returns(void 0, null);
// 	t.is(substitute.foo(), void 0);
// 	t.is(substitute.foo(), null);
// }); 
// test('class method received', t => {
// 	void substitute.c("hi", "there");
// 	void substitute.c("hi", "the1re");
// 	void substitute.c("hi", "there");
// 	void substitute.c("hi", "there");
// 	void substitute.c("hi", "there");
// 	t.notThrows(() => substitute.received(4).c('hi', 'there'));
// 	t.notThrows(() => substitute.received(1).c('hi', 'the1re'));
// 	t.notThrows(() => substitute.received().c('hi', 'there'));
// 	t.throws(() => substitute.received(7).c('hi', 'there'), 
// `Expected 7 calls to the method c with arguments [hi, there], but received 4 of such calls.
// All calls received to method c:
// -> 4 calls with arguments [hi, there]
// -> 1 call with arguments [hi, the1re]`);
// });
// test('received call matches after partial mocks using property instance mimicks', t => {
// 	substitute.d.mimicks(() => instance.d);
// 	substitute.c('lala', 'bar');
// 	substitute.received(1).c('lala', 'bar');
// 	substitute.received(1).c('lala', 'bar');
// 	t.notThrows(() => substitute.received(1).c('lala', 'bar'));
// 	t.throws(() => substitute.received(2).c('lala', 'bar'),
// `Expected 2 calls to the method c with arguments [lala, bar], but received 1 of such call.
// All calls received to method c:
// -> 1 call with arguments [lala, bar]`);
// 	t.deepEqual(substitute.d, 1337);
// });
// test('can call received twice', t => { 
// 	t.throws(() => substitute.received(1337).c('foo', 'bar'), 
// `Expected 1337 calls to the method c with arguments [foo, bar], but received none of such calls.
// All calls received to method c: (no calls)`);
// 	t.throws(() => substitute.received(2117).c('foo', 'bar'),
// `Expected 2117 calls to the method c with arguments [foo, bar], but received none of such calls.
// All calls received to method c: (no calls)`);
// });
// test('class string field get received', t => {
// 	void substitute.a;
// 	void substitute.a;
// 	void substitute.a;
// 	void substitute.a;
// 	t.throws(() => substitute.received(3).a);
// 	t.notThrows(() => substitute.received().a);
// 	t.notThrows(() => substitute.received(4).a);
// });
// test('class with method called "received" can be used for call count verification when proxies are suspended', t => {
// 	Substitute.disableFor(substitute).received(2);
// 	t.throws(() => substitute.received(2).received(2));
// 	t.notThrows(() => substitute.received(1).received(2));
// });
// test('class with method called "received" can be used for call count verification', t => {
// 	Substitute.disableFor(substitute).received('foo');
// 	t.notThrows(() => substitute.received(1).received('foo'));
// 	t.throws(() => substitute.received(2).received('foo'));
// });
// test('partial mocks using property instance mimicks', t => {
// 	substitute.d.mimicks(() => instance.d);
// 	t.deepEqual(substitute.d, 1337);
// });
// test('partial mocks using function mimicks with all args', t => {
// 	substitute.c(Arg.all()).mimicks(instance.c);
// 	t.deepEqual(substitute.c('a', 'b'), 'hello a world (b)');
// });
// test('are arguments equal', t => {
// 	t.true(areArgumentsEqual(Arg.any(), 'hi'));
// 	t.true(areArgumentsEqual(Arg.any('array'), ['foo', 'bar']));
// 	t.false(areArgumentsEqual(['foo', 'bar'], ['foo', 'bar']));
// 	t.false(areArgumentsEqual(Arg.any('array'), 1337));
// });
// test('class string field get returns', t => {
// 	substitute.a.returns("foo", "bar");
// 	t.deepEqual(substitute.a, 'foo');
// 	t.deepEqual(substitute.a, 'bar');
// 	t.deepEqual(substitute.a, void 0);
// 	t.deepEqual(substitute.a, void 0);
// });
//# sourceMappingURL=index.test.js.map