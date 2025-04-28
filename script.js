let points = 0;
let target = 0;

function calculate() {
  const earnings = parseFloat(document.getElementById("earnings").value) || 0;
  const savings = parseFloat(document.getElementById("savings").value) || 0;

  if (earnings === 0) {
    alert("Earnings must be more than 0.");
    return;
  }

  const savingsPercent = (savings / earnings) * 100;
  points = Math.floor(savings / 10);

  document.getElementById("totalEarnings").textContent = earnings.toFixed(2);
  document.getElementById("totalSavings").textContent = savings.toFixed(2);
  document.getElementById("savingsPercent").textContent = savingsPercent.toFixed(2) + "%";
  document.getElementById("points").textContent = points;

  updateProgress(savings);
}

function setTarget() {
  target = parseFloat(document.getElementById("targetAmount").value) || 0;
  if (target <= 0) {
    alert("Enter a valid target amount.");
  } else {
    updateProgress(parseFloat(document.getElementById("totalSavings").textContent));
  }
}

function updateProgress(currentSavings) {
  if (target > 0) {
    const progress = Math.min((currentSavings / target) * 100, 100);
    document.getElementById("progressDisplay").textContent = progress.toFixed(1) + "%";
    document.getElementById("progressFill").style.width = progress + "%";
  }
}

function buyItem(cost) {
  if (points >= cost) {
    points -= cost;
    document.getElementById("points").textContent = points;
    alert("Item purchased successfully! 🎉");
  } else {
    alert("Not enough points!");
  }
}
// Register function
function register() {
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  if (!username || !password) {
    document.getElementById('registerMessage').innerText = "Please fill in both fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[username]) {
    document.getElementById('registerMessage').innerText = "Username already exists.";
    return;
  }

  users[username] = { password, points: 0 };
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('registerMessage').style.color = 'green';
  document.getElementById('registerMessage').innerText = "Registered successfully! You can now log in.";
}

// Login function
function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    loadUserData();
  } else {
    document.getElementById('loginMessage').innerText = "Incorrect username or password.";
  }
}

// Load user data
function loadUserData() {
  const currentUser = localStorage.getItem('currentUser');
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const user = users[currentUser];

  // Update UI with user data
  document.getElementById('points').textContent = user.points;
  // Additional UI updates can be added here
}
// Update leaderboard
function updateLeaderboard() {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  const leaderboard = Object.entries(users)
    .map(([username, data]) => ({ username, points: data.points }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 10); // Top 10 users

  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = '';
  leaderboard.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.username}: ${user.points} points`;
    leaderboardList.appendChild(li);
  });
}

// Call updateLeaderboard() after login or registration
