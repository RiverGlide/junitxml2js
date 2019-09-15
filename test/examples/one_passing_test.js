const expect = require("chai").expect;
const {TestSuites, TestSuite, TestCase} = require("../../lib/junitxml2js");

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
   <testsuite name="JUnitXmlReporter.constructor" errors="0" tests="1" failures="0" time="0" timestamp="2013-05-24T10:23:58">
      <testcase classname="JUnitXmlReporter.constructor" name="should default useDotNotation to true" time="0" />
   </testsuite>
</testsuites>
`.trim();

const js = (() => {
  const tss = new TestSuites();
  ts = new TestSuite({name: "JUnitXmlReporter.constructor", timestamp: "2013-05-24T10:23:58"});
  tc = new TestCase({classname: "JUnitXmlReporter.constructor", name: "should default useDotNotation to true", time: "0"});
  ts.add(tc);
  tss.add(ts);
  return tss;
})();

describe("An testsuite with one passing test", () => {
  it("should convert from XML to JS", () => {
    expect(TestSuites.from(xml).as_non_compact_js).to.deep.equal(js.as_non_compact_js);
  });

  it("should convert from JS to XML", () => {
    expect(js.to_xml()).to.deep.equal(xml);
  });
});
