document.addEventListener('DOMContentLoaded', () => {
    // Parse JSON data
    let users = JSON.parse(userContent);
    const stocks = JSON.parse(stockContent);

    // Hide the details section
    const Details = document.querySelector('.Details');
    Details.style.display = 'none';

    // Generate the user list
    const userList = document.querySelector('.UserList ul');
    const generateUserList = () => {
        userList.innerHTML = '';
        for (const user of users) {
            const li = document.createElement('li');
            li.textContent = `${user.user.firstname} ${user.user.lastname}`;
            li.dataset.id = user.id;
            userList.appendChild(li);
        }
    };
    generateUserList();
    
    const userID = document.querySelector('#userID');
    const firstname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const address = document.querySelector('#address');
    const city = document.querySelector('#city');
    const email = document.querySelector('#email');

    // Event delegation to handle click events in the user list
    userList.addEventListener('click', (e) => {
        if (e.target && e.target.nodeName === 'LI') {
            const logo = document.querySelector('#logo');
            const stockName = document.querySelector('#stockName');
            const stockSector = document.querySelector('#stockSector');
            const stockIndustry = document.querySelector('#stockIndustry');
            const stockAddress = document.querySelector('#stockAddress');
            
            // Reset logo
            logo.src = '';
            logo.alt = '';
            
            // Reset stock details
            stockName.textContent = '';
            stockSector.textContent = '';
            stockIndustry.textContent = '';
            stockAddress.textContent = '';
            
            // Use for...of loop to find the user by id
            for (const user of users) {
                if (user.id == e.target.dataset.id) {
                    // Unhide the details section
                    Details.style.display = 'block';
    
                    // Display user information in the user details form
                    userID.value = user.id;
                    firstname.value = user.user.firstname;
                    lastname.value = user.user.lastname;
                    address.value = user.user.address;
                    city.value = user.user.city;
                    email.value = user.user.email;
    
                    // Display user's stock portfolio holdings
                    const portfolioList = document.querySelector('#listPortfolio');
                    portfolioList.innerHTML = '<h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>';
                    for (const stock of user.portfolio) {
                        const symbolDiv = document.createElement('div');
                        symbolDiv.textContent = stock.symbol;
                        portfolioList.appendChild(symbolDiv);
    
                        const sharesDiv = document.createElement('div');
                        sharesDiv.textContent = stock.owned;
                        portfolioList.appendChild(sharesDiv);
    
                        const actionsDiv = document.createElement('div');
                        const viewButton = document.createElement('button');
                        viewButton.textContent = 'View';
                        viewButton.addEventListener('click', () => {
                            // Find the stock details by symbol
                            for (const stockDetail of stocks) {
                                if (stockDetail.symbol === stock.symbol) {
                                    // Update logo
                                    logo.src = `logos/${stock.symbol}.svg`;
                                    logo.alt = `${stock.symbol} logo`;
                                    
                                    // Display stock details
                                    stockName.textContent = stockDetail.name;
                                    stockSector.textContent = stockDetail.sector;
                                    stockIndustry.textContent = stockDetail.subIndustry;
                                    stockAddress.textContent = stockDetail.address;
                                    
                                    break;
                                }
                            }
                        });
                        actionsDiv.appendChild(viewButton);
                        portfolioList.appendChild(actionsDiv);
                    }
                    
                    // Store the current user id in the details panel's data attribute for later use
                    Details.dataset.userId = user.id;
                    
                    break;
                }
            }
        }
    });
    
    // Save button event handler - updates in-memory user data based on form values
    document.querySelector('#btnSave').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Use for...of loop to update the user data in memory
        for (const user of users) {
            if (user.id == Details.dataset.userId) {
                user.user.firstname = firstname.value;
                user.user.lastname = lastname.value;
                user.user.address = address.value;
                user.user.city = city.value;
                user.user.email = email.value;
                
                break;
            }
        }
        
        generateUserList();
        Details.style.display = 'none';
    });
    
    // Delete button event handler - removes the user from in-memory array using for...of loop
    document.querySelector('#btnDelete').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Use for...of loop to rebuild the users array excluding the deleted user
        let newUsers = [];
        for (const user of users) {
            if (user.id != Details.dataset.userId) {
                newUsers.push(user);
            }
        }
        users = newUsers;
        
        generateUserList();
        Details.style.display = 'none';
    });
});