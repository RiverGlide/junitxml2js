const convert = require("xml-js");

const _xml_declaration = { attributes: { version: "1.0", encoding: "UTF-8", }, };

class TestSuites {
  static from(xml) {
    return this.from_non_compact_js(convert.xml2js(xml))[0];
  }

  static from_non_compact_js(js) {
    const result = new TestSuites();
    (js.elements[0].elements || []).forEach((testcase) => result.add(TestSuite.from_non_compact_js(testcase)));

    return [result,];
  }

  constructor() { this.testsuites = []; }

  add(testsuite) { this.testsuites.push(testsuite); }

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
}

class TestSuite {
  constructor({name, time, timestamp, hostname}) {
    Object.assign(this, {name: name, time: time, timestamp: timestamp, hostname: hostname, });
    this.testcases = [];
  }

  static get attributes() { return ["name", "errors", "skipped", "tests", "failures", "hostname", "time", "timestamp", ]; }

  get tests() { return this.testcases.length; }
  get errors() { return 0; }
  get failures() { return 0; }

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
    };
  }

  static from_non_compact_js(js) {
    const result = new TestSuite(js.attributes);
    return result;
  }
}

module.exports = { TestSuites: TestSuites, TestSuite: TestSuite, };
