// Bank Account class definition using OOP principles
class BankAccount {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
        this.transactionHistory = [];
    }

    // Method to deposit money into the account
    deposit(amount) {
        // Validate that the deposit amount is positive
        if (amount <= 0) {
            this.addTransaction('error', 'Invalid deposit amount', 0);
            return false;
        }

        this.balance += amount;
        const message = `Successfully deposited KSh ${amount.toLocaleString()}. New balance: KSh ${this.balance.toLocaleString()}`;
        this.addTransaction('deposit', message, amount);
        return true;
    }

    // Method to withdraw money from the account
    withdraw(amount) {
        // Validate that the withdrawal amount is positive
        if (amount <= 0) {
            this.addTransaction('error', 'Invalid withdrawal amount', 0);
            return false;
        }

        // Check if there are sufficient funds before processing withdrawal
        if (this.balance < amount) {
            const message = `Insufficient funds. Available balance: KSh ${this.balance.toLocaleString()}`;
            this.addTransaction('error', message, 0);
            return false;
        }

        this.balance -= amount;
        const message = `Successfully withdrew KSh ${amount.toLocaleString()}. New balance: KSh ${this.balance.toLocaleString()}`;
        this.addTransaction('withdraw', message, -amount);
        return true;
    }

    // Method to check the current account balance
    checkBalance() {
        let message;
        
        // Provide different messages based on account status
        if (this.balance < 0) {
            message = `Warning: Negative balance. You owe KSh ${Math.abs(this.balance).toLocaleString()}`;
        } else if (this.balance === 0) {
            message = 'Your account balance is KSh 0.00';
        } else {
            message = `Current balance: KSh ${this.balance.toLocaleString()}`;
        }

        this.addTransaction('check', message, 0);
        return this.balance;
    }

    // Helper method to add transactions to history
    addTransaction(type, message, amount) {
        this.transactionHistory.push({
            type: type,
            message: message,
            amount: amount,
            timestamp: new Date()
        });
    }

    // Method to get all transactions
    getTransactionHistory() {
        return this.transactionHistory;
    }
}

// DOM element references
const accountHolderElement = document.getElementById('accountHolder');
const balanceAmountElement = document.getElementById('balanceAmount');
const balanceIndicatorElement = document.getElementById('balanceIndicator');
const accountStatusElement = document.getElementById('accountStatus');
const amountInput = document.getElementById('amount');
const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
const checkBalanceBtn = document.getElementById('checkBalanceBtn');
const historyList = document.getElementById('historyList');

// Initialize the bank account with default values
let currentAccount = new BankAccount('Stella Njeri Maina', 10000);

// Function to update the UI with current account information
function updateUI() {
    // Update account holder name
    accountHolderElement.textContent = currentAccount.name;
    
    // Update balance display
    balanceAmountElement.textContent = `KSh ${currentAccount.balance.toLocaleString('en-KE', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })}`;

    // Update account status badge based on balance
    const statusBadge = accountStatusElement.querySelector('.status-badge');
    if (currentAccount.balance < 0) {
        statusBadge.textContent = 'Overdrawn';
        statusBadge.style.background = 'rgba(184, 76, 63, 0.9)';
    } else if (currentAccount.balance === 0) {
        statusBadge.textContent = 'Empty';
        statusBadge.style.background = 'rgba(201, 125, 63, 0.9)';
    } else {
        statusBadge.textContent = 'Active';
        statusBadge.style.background = 'rgba(255, 255, 255, 0.2)';
    }

    // Update the visual balance indicator
    updateBalanceIndicator();
    
    // Refresh the transaction history display
    updateTransactionHistory();
}

// Function to update the balance indicator bar
function updateBalanceIndicator() {
    // Calculate percentage based on a reference amount (e.g., initial balance or max balance)
    const referenceAmount = 50000;
    const percentage = Math.min((currentAccount.balance / referenceAmount) * 100, 100);
    
    if (balanceIndicatorElement) {
        const indicator = balanceIndicatorElement.querySelector('::after') || balanceIndicatorElement;
        balanceIndicatorElement.style.setProperty('--indicator-width', `${Math.max(0, percentage)}%`);
    }
}

// Function to display transaction history
function updateTransactionHistory() {
    const transactions = currentAccount.getTransactionHistory();
    
    // Clear the current history display
    historyList.innerHTML = '';

    // If no transactions, show empty state
    if (transactions.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No transactions yet</p>';
        return;
    }

    // Display transactions in reverse order (newest first)
    transactions.slice().reverse().forEach(transaction => {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type}`;
        
        // Format the transaction display
        let amountDisplay = '';
        if (transaction.amount > 0) {
            amountDisplay = `<span class="transaction-amount positive">+KSh ${transaction.amount.toLocaleString()}</span>`;
        } else if (transaction.amount < 0) {
            amountDisplay = `<span class="transaction-amount negative">KSh ${transaction.amount.toLocaleString()}</span>`;
        }

        item.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-type">${capitalizeFirst(transaction.type)}</div>
                <div class="transaction-message">${transaction.message}</div>
            </div>
            ${amountDisplay}
        `;
        
        historyList.appendChild(item);
    });
}

// Helper function to capitalize the first letter of a string
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to get the amount from input and validate it
function getAmount() {
    const amount = parseFloat(amountInput.value);
    
    // Check if the entered amount is valid
    if (isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return null;
    }
    
    return amount;
}

// Function to show temporary notifications (simple alert for now)
function showNotification(message, type) {
    // This could be enhanced with a custom toast notification system
    alert(message);
}

// Event listener for deposit button
depositBtn.addEventListener('click', () => {
    const amount = getAmount();
    if (amount === null) return;
    
    const success = currentAccount.deposit(amount);
    if (success) {
        amountInput.value = '';
        updateUI();
    }
});

// Event listener for withdraw button
withdrawBtn.addEventListener('click', () => {
    const amount = getAmount();
    if (amount === null) return;
    
    const success = currentAccount.withdraw(amount);
    updateUI();
    
    // Clear input only if withdrawal was successful
    if (success) {
        amountInput.value = '';
    }
});

// Event listener for check balance button
checkBalanceBtn.addEventListener('click', () => {
    currentAccount.checkBalance();
    updateUI();
});

// Allow pressing Enter in the amount input to trigger deposit
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        depositBtn.click();
    }
});

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    
    // Optional: Perform initial transactions for demonstration
    // These can be removed or modified as needed
    currentAccount.deposit(100000);
    currentAccount.withdraw(60000);
    currentAccount.checkBalance();
    updateUI();
});
