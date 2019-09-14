const expect = require("chai").expect;
const TestSuites = require("../../lib/junitxml2js").TestSuites;

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<testsuites />
`;

const js = new TestSuites();

describe("XML to JS", () => {
  it("should convert XML to an identical JS representation", () => {
    expect(TestSuites.from(xml)).to.deep.equal(js);
  });
});
