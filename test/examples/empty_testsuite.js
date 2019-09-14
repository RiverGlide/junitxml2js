const expect = require("chai").expect;
const {TestSuites, TestSuite} = require("../../lib/junitxml2js");

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
   <testsuite name="JUnitXmlReporter" errors="0" tests="0" failures="0" time="0" timestamp="2013-05-24T10:23:58" />
</testsuites>
`.trim();

const js = new TestSuites();
js.add(new TestSuite({name: "JUnitXmlReporter", time: "0", timestamp: "2013-05-24T10:23:58"}));

describe("An empty testsuite", () => {
  it("should convert from XML to JS", () => {
    expect(TestSuites.from(xml).as_non_compact_js).to.deep.equal(js.as_non_compact_js);
  });

  it("should convert from JS to XML", () => {
    expect(js.to_xml()).to.deep.equal(xml);
  });
});
