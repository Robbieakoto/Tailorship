const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const db = new Database(path.join(__dirname, 'tailorship.db'));

app.use(cors());
app.use(express.json());

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    userId TEXT,
    name TEXT,
    phone TEXT,
    gender TEXT,
    dateTaken TEXT,
    measurements TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

// Setup prepared statements
const stmts = {
    getUser: db.prepare('SELECT * FROM users WHERE id = ?'),
    createUser: db.prepare('INSERT INTO users (id) VALUES (?)'),
    getCustomers: db.prepare('SELECT * FROM customers WHERE userId = ?'),
    getCustomer: db.prepare('SELECT * FROM customers WHERE id = ? AND userId = ?'),
    addCustomer: db.prepare('INSERT INTO customers (id, userId, name, phone, gender, dateTaken, measurements) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    updateCustomer: db.prepare('UPDATE customers SET name = ?, phone = ?, gender = ?, dateTaken = ?, measurements = ? WHERE id = ? AND userId = ?'),
    deleteCustomer: db.prepare('DELETE FROM customers WHERE id = ? AND userId = ?')
};

// Auth middleware (simplified for this task)
const authenticate = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
    }
    req.userId = userId;
    next();
};

// Register endpoint
app.post('/api/auth/register', (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: 'User ID required' });

        const existing = stmts.getUser.get(userId);
        if (existing) {
            return res.status(400).json({ error: 'User ID already exists. Please choose another or login.' });
        }

        stmts.createUser.run(userId);
        res.status(201).json({ success: true, user: { id: userId } });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Database error during registration' });
    }
});

// Auth endpoint
app.post('/api/auth/login', (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: 'User ID required' });

        let user = stmts.getUser.get(userId);
        if (!user) {
            return res.status(404).json({ error: 'User ID not found. Please create one.' });
        }
        res.json({ success: true, user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Database error during login' });
    }
});

// Customers endpoints
app.get('/api/customers', authenticate, (req, res) => {
    const customers = stmts.getCustomers.all(req.userId);
    res.json(customers.map(c => ({
        ...c,
        measurements: JSON.parse(c.measurements)
    })));
});

app.post('/api/customers', authenticate, (req, res) => {
    const customer = req.body;
    const id = Date.now().toString();
    stmts.addCustomer.run(
        id,
        req.userId,
        customer.name,
        customer.phone,
        customer.gender,
        customer.dateTaken,
        JSON.stringify(customer.measurements)
    );
    res.json({ id, ...customer });
});

app.put('/api/customers/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const customer = req.body;
    stmts.updateCustomer.run(
        customer.name,
        customer.phone,
        customer.gender,
        customer.dateTaken,
        JSON.stringify(customer.measurements),
        id,
        req.userId
    );
    res.json({ success: true });
});

app.delete('/api/customers/:id', authenticate, (req, res) => {
    const { id } = req.params;
    stmts.deleteCustomer.run(id, req.userId);
    res.json({ success: true });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
