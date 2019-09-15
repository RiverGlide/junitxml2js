const convert = require("xml-js");

const _xml_declaration = { attributes: { version: "1.0", encoding: "UTF-8", }, };

class TestSuites {
  constructor() { this.testsuites = []; }
  add(testsuite) { this.testsuites.push(testsuite); }

  static from(xml) {
    return this.from_non_compact_js(convert.xml2js(xml))[0];
  }

  to_xml() {
    return convert.js2xml({
      declaration: _xml_declaration,
      elements: this.as_non_compact_js,
    }, { spaces: 3, })
      .replace("/>", " />");
  }

  get as_non_compact_js() {
    return [{
      type: "element",
      name: this.constructor.name.toLowerCase(),
      elements: this.testsuites.map((suite) => suite.as_non_compact_js),
    },];
  }

  static from_non_compact_js(js) {
    const result = new TestSuites();
    (js.elements[0].elements || []).forEach((testsuite) => result.add(TestSuite.from_non_compact_js(testsuite)));

    return [result,];
  }
}

class TestSuite {
  constructor({name, timestamp, hostname}) {
    Object.assign(this, {name: name, timestamp: timestamp, hostname: hostname, });
    this.testcases = [];
  }


  add(testcase) {
    this.testcases.push(testcase);
  }

  get tests() { return this.testcases.length; }
  get time() { return 0; }
  get errors() { return 0; }
  get failures() { return 0; }

  static get attributes() { return ["name", "errors", "skipped", "tests", "failures", "hostname", "time", "timestamp", ]; }

  non_empty(attributes) {
    return attributes.reduce((result,attribute) => {
      if(this[attribute] !== undefined) { result[attribute] = this[attribute]; }
      return result;
    }, {});
  }

  get as_non_compact_js() {
    return {
      type: "element",
      name: this.constructor.name.toLowerCase(),
      attributes: this.non_empty(this.constructor.attributes),
      elements: this.testcases.map((testcase) => testcase.as_non_compact_js),
    };
  }

  static from_non_compact_js(js) {
    const result = new TestSuite(js.attributes);
    (js.elements || []).forEach((testcase) => result.add(TestCase.from_non_compact_js(testcase)));
    return result;
  }
}

class TestCase {
  constructor({classname, name, time, result}) {
    Object.assign(this, {classname: classname, name: name, time: time, result: result, });
  }

  static get attributes() { return ["classname", "name", "time"]; }

  non_empty(attributes) {
    return attributes.reduce((result,attribute) => {
      if(this[attribute] !== undefined) { result[attribute] = this[attribute]; }
      return result;
    }, {});
  }

  get as_non_compact_js() {
    return {
      type: "element",
      name: this.constructor.name.toLowerCase(),
      attributes: this.non_empty(this.constructor.attributes),
      elements: this.result ? [this.result.as_non_compact_js] : [],
    };
  }

  static from_non_compact_js(js) {
    const testresult = js.elements ? new Skipped() : undefined;
    const result = new TestCase(Object.assign({result: testresult,}, js.attributes));

    return result;
  }
}

class Test {
  static Skipped() { return new Skipped(); }
}

class Skipped {
  get as_non_compact_js() {
    return {
      type: "element",
      name: this.constructor.name.toLowerCase(),
    };
  }
}

module.exports = { TestSuites: TestSuites, TestSuite: TestSuite, TestCase: TestCase, Test: Test, };
