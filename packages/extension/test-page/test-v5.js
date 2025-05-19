function runTests(){
    // window.test = Immutable.fromJS({"a": "test", b: [{a:2},{b:3}]})
    // console.log(window.test)

    class ABRecord extends Immutable.Record({a:1,b:2}) {
      getAB() {
        return this.a + this.b;
      }
    }

    var Xyz = new Immutable.Map({a: new Immutable.Map({b:8})})
    console.log("Expand this and check child renders as a Map", Xyz)

    var Foo = Immutable.Record({bar: new Immutable.Map({a: 5}) })
    var f = Foo()
    console.log("Expand this and check child renders as a Map", f)

    const record = new ABRecord();
    const record2 = new ABRecord({a: 2});
    console.log(record);
    console.log(record2);

    const orderedMap = Immutable.OrderedMap({key: "value"});
    const orderedMap2 = Immutable.OrderedMap([["key", "value"], ["key2", "value2"]]);
    console.log(orderedMap);
    console.log(orderedMap2);

    const orderedSet = Immutable.OrderedSet(["hello", "aaa"]);
    console.log(orderedSet);

    const list = Immutable.List(["hello", "world"]);
    console.log(list)

    const map = Immutable.Map({hello: "world"})
    console.log(map)

    const set = Immutable.Set(["hello", "aaa"])
    console.log(set)

    const stack = Immutable.Stack(["hello", "aaa"])
    console.log(stack)

    const range = Immutable.Range(0, 10, 2);
    console.log(range);

    console.log("shoudln't cause error", Immutable.Record.prototype)

    if (window.isRecordForTesting) {
        console.assert(isRecordForTesting(record))
        console.assert(isRecordForTesting(record2));
        [orderedMap, orderedMap2, orderedSet, list, map, set, stack].forEach(function(o){
            console.assert(!isRecordForTesting(o))
        })
        console.log("Ran isRecord tests")
    }
}