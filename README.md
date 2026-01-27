# Bank Account Manager

A modern, interactive bank account management system built with vanilla JavaScript using Object-Oriented Programming principles. This application demonstrates core banking operations including deposits, withdrawals, and balance checking with a clean, responsive user interface.

## Overview

This project showcases fundamental JavaScript OOP concepts by implementing a fully functional banking application in the browser. Users can perform common banking transactions while the application maintains a complete transaction history and provides real-time feedback on account status.

## Features

### Core Functionality
- **Account Management**: Track account holder information and current balance
- **Deposit Operations**: Add funds to the account with validation
- **Withdrawal Operations**: Remove funds with insufficient balance checking
- **Balance Inquiry**: View current account status with detailed messaging
- **Transaction History**: Complete log of all account activities with timestamps

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant visual feedback for all transactions
- **Status Indicators**: Visual cues for account health (active, empty, overdrawn)
- **Transaction Feed**: Chronological display of account activity
- **Smooth Animations**: Professional transitions and micro-interactions

### Technical Features
- **Object-Oriented Design**: Clean class-based architecture
- **Input Validation**: Comprehensive error handling and user feedback
- **Accessibility**: Keyboard navigation and reduced motion support
- **Browser Compatibility**: Cross-browser CSS with vendor prefixes

## Technologies Used

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern styling with custom properties and animations
- **JavaScript (ES6+)**: Classes, arrow functions, and modern syntax
- **Git**: Version control and project history

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Martin888Maina/JS-Bank-Account-Program.git
```

2. Navigate to the project directory:
```bash
cd JS-Bank-Account-Program
```

3. Open the application:
   - Simply open `index.html` in your web browser
   - Or use a local development server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

4. Access the application at `http://localhost:8000` (if using a server)

## Usage

### Basic Operations

1. **Making a Deposit**:
   - Enter the amount in the input field
   - Click the "Deposit" button or press Enter
   - View the updated balance and transaction confirmation

2. **Making a Withdrawal**:
   - Enter the amount you wish to withdraw
   - Click the "Withdraw" button
   - The system will validate sufficient funds before processing

3. **Checking Balance**:
   - Click the "Check Balance" button
   - View your current balance with status message

### Code Example

The application uses a simple but effective OOP structure:

```javascript
// Create a new bank account
let account = new BankAccount('John Doe', 5000);

// Perform transactions
account.deposit(1000);    // Add funds
account.withdraw(500);    // Remove funds
account.checkBalance();   // Check current balance
```

## Project Structure

```
JS-Bank-Account-Program/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # JavaScript logic and OOP implementation
├── README.md           # Project documentation
└── LICENSE             # MIT License
```

## Code Architecture

### BankAccount Class

The core of the application is the `BankAccount` class which encapsulates all banking logic:

- **Properties**:
  - `name`: Account holder's name
  - `balance`: Current account balance
  - `transactionHistory`: Array of all transactions

- **Methods**:
  - `deposit(amount)`: Add funds to the account
  - `withdraw(amount)`: Remove funds with validation
  - `checkBalance()`: Return current balance with status
  - `addTransaction()`: Internal method for history tracking
  - `getTransactionHistory()`: Retrieve all transactions

### UI Management

The user interface is managed through several helper functions:
- `updateUI()`: Syncs DOM with current account state
- `updateBalanceIndicator()`: Visual representation of balance
- `updateTransactionHistory()`: Displays transaction log
- `getAmount()`: Validates and retrieves user input

## Design Decisions

### Color Palette
The application uses an earth-tone banking theme with forest greens and gold accents, avoiding common AI-generated color schemes:
- Primary Green: #2d5016 (Forest green for trust)
- Accent Gold: #d4a574 (Financial sophistication)
- Light Cream: #f8f6f1 (Professional background)

### Validation Strategy
All user inputs are validated before processing:
- Amount must be a positive number
- Withdrawals check for sufficient funds
- Clear error messages guide user corrections

### Responsive Approach
Mobile-first CSS ensures the application works on all screen sizes with specific breakpoints for optimal viewing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Note: The application uses modern CSS features. For older browsers, consider adding polyfills or autoprefixer.

## Future Enhancements

Potential improvements for future versions:
- Multiple account support with account switching
- Transaction categories and filtering
- Export transaction history as CSV or PDF
- Interest calculation features
- Recurring deposit/withdrawal scheduling
- Authentication and user accounts
- Backend integration with database persistence

## Learning Outcomes

This project demonstrates proficiency in:
- JavaScript Object-Oriented Programming
- DOM manipulation and event handling
- CSS styling and responsive design
- User input validation and error handling
- Git version control workflow
- Clean code practices and documentation

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome. Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Martin Maina**
- GitHub: [@Martin888Maina](https://github.com/Martin888Maina)

## Acknowledgments

This project was created as part of learning web development fundamentals and JavaScript OOP concepts. It serves as a demonstration of front-end development skills for potential employers and collaborators.

---

**Note**: This is a demonstration project for educational purposes. It does not implement real banking security features and should not be used for actual financial transactions.
