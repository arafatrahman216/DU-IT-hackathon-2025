import supabase from './supabase.js';

// async function testConnection() {
//   // Replace 'test_table' with an actual table name in your Supabase database
//   const { data, error } = await supabase.from('User').select('*');

//   if (error) {
//     console.error('Database connection or query failed:', error.message);
//   } else {
//     console.log('Database connected! Sample data:', data);
//   }
// }

//create a test table in supabase
// async function createTestTable() {
//   const { error } = await supabase
//     .from('test_table')
//     .insert([{ name: 'Test', value: 'Sample' }]);

//   if (error) {
//     console.error('Failed to create test table:', error.message);
//   } else {
//     console.log('Test table created successfully!');
//   }
// }
// Uncomment the following line to create a test table
// createTestTable();

// testConnection();