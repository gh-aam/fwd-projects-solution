const companies = JSON.parse(content);

function CompanyCard(company) {
    this.symbol = company.symbol;
    this.name = company.companyName;
    this.day50 = company.stats.day50MovingAvg;
    this.day200 = company.stats.day200MovingAvg;
    this.revenue = company.stats.operatingRevenue - company.stats.costOfRevenue;
    this.marketCap50 = company.stats.sharesOutstanding * company.stats.day50MovingAvg;
    this.marketCap200 = company.stats.sharesOutstanding * company.stats.day200MovingAvg;
    this.equity = company.stats.totalAssets - company.stats.totalLiabilities;
    this.tags = company.tags;
    
    const currency = num => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };
    
    const billions = num => {
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
            style: 'currency',
            currency: 'USD'
        }).format(num);
    };
    
    this.outputCard = function () {
        document.write(`<article class="card">`);
        document.write(`<h2>${this.symbol} - ${this.name}</h2>`);
        document.write(`<div>`);
        document.write(`<p>Share Price (50day avg): <span>${currency(this.day50)}</span></p>`);
        document.write(`<p>Share Price (200day avg): <span>${currency(this.day200)}</span></p>`);
        document.write(`<p>Market Cap (50day avg): <span>${billions(this.marketCap50)}</span></p>`);
        document.write(`<p>Market Cap (200day avg): <span>${billions(this.marketCap200)}</span></p>`);
        document.write(`<p>Net Revenue: <span>${billions(this.revenue)}</span></p>`);
        document.write(`<p>Shareholder Equity: <span>${billions(this.equity)}</span></p>`);
        document.write(`</div>`);
        document.write(`<footer>`);
        
        for (let tag of this.tags) {
            document.write(`<small>${tag}</small>`);
        }
        
        document.write(`</footer>`);
        document.write(`</article>`);
    };
}

function outputCompanyCards() {
    for (let company of companies) {
        const curr_company = new CompanyCard(company);
        curr_company.outputCard();
    }
}

outputCompanyCards();