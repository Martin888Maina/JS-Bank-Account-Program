class BankAccount {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
        this.transactionHistory = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            this.addTransaction('error', 'Invalid deposit amount', 0);
            return false;
        }

        this.balance += amount;
        const message = `Successfully deposited KSh ${amount.toLocaleString()}. New balance: KSh ${this.balance.toLocaleString()}`;
        this.addTransaction('deposit', message, amount);
        return true;
    }

    withdraw(amount) {
        if (amount <= 0) {
            this.addTransaction('error', 'Invalid withdrawal amount', 0);
            return false;
        }

        // Guards against negative balance; check occurs before mutation so no rollback is needed.
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

    checkBalance() {
        let message;

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

    addTransaction(type, message, amount) {
        this.transactionHistory.push({
            type: type,
            message: message,
            amount: amount,
            timestamp: new Date()
        });
    }

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

let currentAccount = new BankAccount('Jane Doe', 10000);

function updateUI() {
    accountHolderElement.textContent = currentAccount.name;

    balanceAmountElement.textContent = `KSh ${currentAccount.balance.toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

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

    updateBalanceIndicator();
    updateTransactionHistory();
}

function updateBalanceIndicator() {
    // 50000 is an arbitrary visual scale cap; the bar fills relative to this value, not an account limit.
    const referenceAmount = 50000;
    const percentage = Math.min((currentAccount.balance / referenceAmount) * 100, 100);

    if (balanceIndicatorElement) {
        const indicator = balanceIndicatorElement.querySelector('::after') || balanceIndicatorElement;
        balanceIndicatorElement.style.setProperty('--indicator-width', `${Math.max(0, percentage)}%`);
    }
}

function updateTransactionHistory() {
    const transactions = currentAccount.getTransactionHistory();

    historyList.innerHTML = '';

    if (transactions.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No transactions yet</p>';
        return;
    }

    // Reverse slice so the most recent transaction appears at the top without mutating the source array.
    transactions.slice().reverse().forEach(transaction => {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type}`;

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

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getAmount() {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return null;
    }

    return amount;
}

function showNotification(message, type) {
    alert(message);
}

depositBtn.addEventListener('click', () => {
    const amount = getAmount();
    if (amount === null) return;

    const success = currentAccount.deposit(amount);
    if (success) {
        amountInput.value = '';
        updateUI();
    }
});

withdrawBtn.addEventListener('click', () => {
    const amount = getAmount();
    if (amount === null) return;

    const success = currentAccount.withdraw(amount);
    updateUI();

    // Input is only cleared on success so the user can correct the amount on a failed withdrawal.
    if (success) {
        amountInput.value = '';
    }
});

checkBalanceBtn.addEventListener('click', () => {
    currentAccount.checkBalance();
    updateUI();
});

// Enter key in the amount field triggers a deposit, matching the primary action button position.
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        depositBtn.click();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    currentAccount.deposit(100000);
    currentAccount.withdraw(60000);
    currentAccount.checkBalance();
    updateUI();
});
