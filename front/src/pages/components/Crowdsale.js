const Crowdsale = () => {
    return ( 
        <div
        id="presale"
        className="live-acution-home2 justify-content-center"
        style={{ padding: "30px 0 50px 0 !important" }}
      >
        <div className="container-fluid max-width-1000">
          <div className="live-auction-inr">
            <div className="heading-otr">
              <div className="head-otr">
                <span className="dot" />
                <h3 className="heading heading-h3">Crowdsale is Live</h3>
              </div>
            </div>
            <span className="line" />
            <div>
              <p className="mb-2">Pre-sale supply: 5,000,000</p>
              <p className="mb-2">
                Pre-sale address:{" "}
                <span className="text-primary copy text-break">
                  0x9143d439c64FeEa073100b8E8Ff62c5A729BaDeb
                </span>{" "}
                <a
                  className="copy d-inline-block"
                  text="0x9143d439c64FeEa073100b8E8Ff62c5A729BaDeb"
                  href="javascript:;"
                >
                  <i className="icofont-ui-copy" />
                </a>
              </p>
              <p className="mb-2">Pre-sale price: 1 ETH = 10,000 ITK</p>
              <p className="mb-2">
                The minimum purchase is 0.1 ETH, and the maximum purchase is 10
                ETH.
              </p>
              <p className="mb-2">
                Enter the amount of ETH below
              </p>
              
          <div
            id="airdrop-block"
            className="row row-work justify-content-center"
          >
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              <form id="airdrop-form" data-lpignore="true">
                <input name="ref" type="hidden" defaultValue />
                <div className="input-group">
                  <input
                    name="amount"
                    className="input form-control"
                    type="number"
                    placeholder="Input ETH amount"
                  />
                  <button type="submit" className="btn btn-fill py-2">
                    Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default Crowdsale;