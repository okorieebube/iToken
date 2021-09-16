const iToken = artifacts.require("iToken");
require("chai").should();

contract("iToken", (accounts) => {
    const _name = "iToken";
    const _symbol = "ITK";
    const _decimals = 18;

    beforeEach(async () => {
        this.token = await iToken.new(_name, _symbol);
    })


    // Describe - to describe what a group of tests will do.
    describe("check contract details", () => {

        // It - used to describe each unit test.
        it("is deployed", async () => {
            const ITK = await iToken.deployed();
        });

        it("has correct name", async () => {
            let name = await this.token.name();
            name.should.equal(_name);
        });
        it("has correct symbol", async () => {
            let symbol = await this.token.symbol();
            symbol.should.equal(_symbol);
        });
        it("has correct decimal", async () => {
            let decimals = await this.token.decimals();
            decimals.words[0].should.equal(18);
        });


    });
});