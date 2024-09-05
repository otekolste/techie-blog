module.exports = {
  // Helper to take a date and return in D/MM/YYY format
  format_date: (date) => {
    return date.toLocaleDateString("en-US");
  },
};
