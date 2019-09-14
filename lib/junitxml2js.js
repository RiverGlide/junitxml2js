const convert = require("xml-js");

const _xml_declaration = { attributes: { version: "1.0", encoding: "UTF-8", }, };

class TestSuites {
  static from(xml) { return new TestSuites(); }
  to_xml() { return convert.js2xml({ declaration: _xml_declaration, elements: this.as_non_compact_js, }, { spaces: 3, }).replace("/>", " />"); }
  get as_non_compact_js() { return [ { type: "element", name: this.constructor.name.toLowerCase(), }, ]; }
};

module.exports = { TestSuites: TestSuites };
