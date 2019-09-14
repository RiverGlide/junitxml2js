const expect = require("chai").expect;
const TestSuites = require("../../lib/junitxml2js").TestSuites;

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<testsuites />
`.trim();

const js = new TestSuites();

describe("An empty testsuite", () => {
  it("should convert from XML to JS", () => {
    expect(TestSuites.from(xml)).to.deep.equal(js);
  });

  it("should convert from JS to XML", () => {
    expect(js.to_xml()).to.deep.equal(xml);
  });
});
