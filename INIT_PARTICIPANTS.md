# Initialize Participants in Firebase

Your participants database is empty. Run this command to load all 79 participants.

## Quick Setup (30 seconds)

1. Open the browser console (`F12`)
2. Copy and paste this command:

```javascript
(async () => {
  const { initializeEvent } = await import('./src/services/firebaseService.js');
  const blindCodingData = [
    { id: 1, name: "Siddhi Sarode", initials: "SS", score: 0 },
    { id: 2, name: "Arya Shetye", initials: "AS", score: 0 },
    { id: 3, name: "Kajal Patil", initials: "KP", score: 0 },
    { id: 4, name: "Rohit Meel", initials: "RM", score: 0 },
    { id: 5, name: "Abhishek Nimbalkar", initials: "AN", score: 0 },
    { id: 6, name: "Om Ghodekar", initials: "OG", score: 0 },
    { id: 7, name: "Nishta Patil", initials: "NP", score: 0 },
    { id: 8, name: "Nikita Lavange", initials: "NL", score: 0 },
    { id: 9, name: "Vinit Paratane", initials: "VP", score: 0 },
    { id: 10, name: "Prasanna Burli", initials: "PB", score: 0 },
    { id: 11, name: "Aditya Satav", initials: "AS", score: 0 },
    { id: 12, name: "Raj Jogawade", initials: "RJ", score: 0 },
    { id: 13, name: "Sarthak Kundale", initials: "SK", score: 0 },
    { id: 14, name: "Vedant Mhaske", initials: "VM", score: 0 },
    { id: 15, name: "Abhishek Jawale", initials: "AJ", score: 0 },
    { id: 16, name: "Sanskar Dhamale", initials: "SD", score: 0 },
    { id: 17, name: "Meghana Konde", initials: "MK", score: 0 },
    { id: 18, name: "Saurabh Sharma", initials: "SS", score: 0 },
    { id: 19, name: "Ayush Pawar", initials: "AP", score: 0 },
    { id: 20, name: "Zeeshan Altaf Jagirdar", initials: "ZA", score: 0 },
    { id: 21, name: "Bhavik Mahalle", initials: "BM", score: 0 },
    { id: 22, name: "Krrish Pardeshi", initials: "KP", score: 0 },
    { id: 23, name: "Sarthak Jadhav", initials: "SJ", score: 0 },
    { id: 24, name: "Abhishek Kalimath", initials: "AK", score: 0 },
    { id: 25, name: "Ruchita Suryawanshi", initials: "RS", score: 0 },
    { id: 26, name: "Shreyas Dambalkar", initials: "SD", score: 0 },
    { id: 27, name: "Sanket Devhare", initials: "SD", score: 0 },
    { id: 28, name: "Chaitanya Kulkarni", initials: "CK", score: 0 },
    { id: 29, name: "Adesh Phadtare", initials: "AP", score: 0 },
    { id: 30, name: "Prathamesh Devkar", initials: "PD", score: 0 }
  ];
  
  const promptverseData = [
    { id: 1, name: "Sakshi Thombare", initials: "ST", score: 0 },
    { id: 2, name: "Steve Pinto", initials: "SP", score: 0 },
    { id: 3, name: "Saloni Khatal", initials: "SK", score: 0 },
    { id: 4, name: "Shital Godse", initials: "SG", score: 0 },
    { id: 5, name: "Varun Upadhye", initials: "VU", score: 0 },
    { id: 6, name: "Mansi Patil", initials: "MP", score: 0 },
    { id: 7, name: "Suraj Pingle", initials: "SP", score: 0 },
    { id: 8, name: "Vikas Gayke", initials: "VG", score: 0 },
    { id: 9, name: "Aryan Chavan", initials: "AC", score: 0 },
    { id: 10, name: "Raman Rajhans", initials: "RR", score: 0 },
    { id: 11, name: "Revati Mirapurkar", initials: "RM", score: 0 },
    { id: 12, name: "Soham Nemade", initials: "SN", score: 0 },
    { id: 13, name: "Om Pachpande", initials: "OP", score: 0 },
    { id: 14, name: "Anvi Shete", initials: "AS", score: 0 },
    { id: 15, name: "Arjun Sul", initials: "AS", score: 0 },
    { id: 16, name: "Jason Dennis", initials: "JD", score: 0 },
    { id: 17, name: "Kajal Karande", initials: "KK", score: 0 },
    { id: 18, name: "Amol Walzade", initials: "AW", score: 0 },
    { id: 19, name: "Arya Manalwar", initials: "AM", score: 0 },
    { id: 20, name: "Aditya Sahane", initials: "AS", score: 0 },
    { id: 21, name: "Sangaramsinh Deshmukh", initials: "SD", score: 0 },
    { id: 22, name: "Vishakha Unhale", initials: "VU", score: 0 },
    { id: 23, name: "Siddhi Sarode", initials: "SS", score: 0 },
    { id: 24, name: "Dipesh Ahire", initials: "DA", score: 0 },
    { id: 25, name: "Abhishek Ganesh Jadhav", initials: "AG", score: 0 },
    { id: 26, name: "Manas Gaikwad", initials: "MG", score: 0 },
    { id: 27, name: "Sahil Bhor", initials: "SB", score: 0 },
    { id: 28, name: "Adwait Bhalerao", initials: "AB", score: 0 },
    { id: 29, name: "Samiksha Raut", initials: "SR", score: 0 },
    { id: 30, name: "Shivani Ghavate", initials: "SG", score: 0 },
    { id: 31, name: "Ujjwal Dinesh Yadav", initials: "UD", score: 0 },
    { id: 32, name: "Piyush Sonawane", initials: "PS", score: 0 },
    { id: 33, name: "Nikhil Patil", initials: "NP", score: 0 },
    { id: 34, name: "Madhura Patil", initials: "MP", score: 0 },
    { id: 35, name: "Sarthak Jadhav", initials: "SJ", score: 0 },
    { id: 36, name: "Anand Jain", initials: "AJ", score: 0 },
    { id: 37, name: "Tanisha Dhopte", initials: "TD", score: 0 },
    { id: 38, name: "Raj Fulsundar", initials: "RF", score: 0 },
    { id: 39, name: "Ansh Pandey", initials: "AP", score: 0 },
    { id: 40, name: "Siddhant Birajdar", initials: "SB", score: 0 },
    { id: 41, name: "Laxmi Birajdar", initials: "LB", score: 0 },
    { id: 42, name: "Yash Sharma", initials: "YS", score: 0 },
    { id: 43, name: "Prathamesh Devkar", initials: "PD", score: 0 },
    { id: 44, name: "Bhushan Kshirsagar", initials: "BK", score: 0 },
    { id: 45, name: "Tyagi Jain", initials: "TJ", score: 0 },
    { id: 46, name: "Viraj Ohal", initials: "VO", score: 0 },
    { id: 47, name: "Suyog Sudhir Sawji", initials: "SS", score: 0 },
    { id: 48, name: "Vaishnavi More", initials: "VM", score: 0 },
    { id: 49, name: "Om Naidu", initials: "ON", score: 0 }
  ];
  
  try {
    await initializeEvent('blindcoding', blindCodingData);
    console.log('✅ Blind Coding: 30 participants loaded');
    
    await initializeEvent('promptverse', promptverseData);
    console.log('✅ Promptverse: 49 participants loaded');
    
    console.log('✅ All 79 participants initialized! Refreshing page...');
    location.reload();
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
```

3. Press **Enter**
4. Wait for "✅ All 79 participants initialized!" message
5. Page will auto-refresh and show all participants ✅

Done! 🚀
