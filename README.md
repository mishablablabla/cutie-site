# 🌟 Wish List Manager 🌟

This project is a **Wish List Manager** 🎁 application built with vanilla JavaScript. It allows users to create, manage, and prioritize their wish list items with an interactive UI. The data is stored locally in the browser using `localStorage`. 🖥️

## ✨ Features ✨

- **🆕 Add New Wishes**: Add new wishes with a title, link, price, currency, and priority.  
- **❤️ Priority Selection**: Assign priorities to wishes using a 3-heart ❤️❤️❤️ visual indicator.  
- **📂 LocalStorage Support**: Automatically saves and retrieves wish list data using `localStorage`.  
- **🔍 View and Edit Wishes**: View wish details, update fields, or delete entries.  
- **✅ Mark as Completed**: Mark wishes as completed, which applies a strikethrough style.  
- **💱 Currency Conversion (Planned)**: Convert gift prices between different currencies.  
- **💰 Currency Conversion**: Get up-to-date exchange rates and convert the price of your gift directly in the "Get more info" window.  
  - **Data Source**: The exchange rates are fetched from the open API **[frankfurter.dev](https://www.frankfurter.app/)**.  
  - **Rate Update Frequency**: The API is queried once per day, and the fetched data is stored locally. The data is then used for currency conversion, ensuring accurate and up-to-date pricing.

## 🚀 How It Works

1. **🌈 Adding a Wish**:  
   - Enter a title, link, price, and select a currency.  
   - Set the priority by clicking on the hearts ❤️.  
   - Submit the form to add the wish to the list.  

2. **🔎 Viewing Details**:  
   - Click the "Get more info" button to view additional details about a wish.  
   - In this window, you can convert the gift's price between different currencies using the latest exchange rates.  

3. **✏️ Editing or 🗑️ Deleting**:  
   - Use the edit button to modify wish details.  
   - Use the delete button to remove the wish from the list.  

4. **✔️ Marking Wishes Completed**:  
   - Click the "Complete" button to mark a wish as fulfilled. 🎉  

## Technologies

This project is built using the following technologies:

- **HTML5**: For structuring the web page.
- **CSS3**: For styling the user interface.
- **Vanilla JavaScript**: For application logic, asynchronous requests, and DOM manipulation.
- **localStorage**
-  **[frankfurter.dev](https://www.frankfurter.app/) API**
