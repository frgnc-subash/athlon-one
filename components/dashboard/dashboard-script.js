// Dashboard JavaScript
const currentDate = new Date();
let currentUnjoinButton = null;
let currentEventId = null;

// Enhanced event details data with more interactive information
const eventDetails = {
  "basketball-tournament": {
    title: "Basketball Tournament",
    date: "March 15, 2024",
    time: "10:00 AM",
    location: "Main Sports Complex",
    description:
      "Annual basketball tournament featuring teams from across the region. This competitive event showcases the best talent in basketball with professional referees and live streaming.",
    requirements:
      "Valid registration, sports attire, water bottle, medical clearance",
    prizes:
      "1st Place: $500 + Trophy, 2nd Place: $300 + Medal, 3rd Place: $200 + Medal",
    contact: "tournament@athlon-one.com",
    participants: 64,
    maxParticipants: 128,
    registrationDeadline: "March 10, 2024",
    category: "Team Sport",
    difficulty: "Advanced",
  },
  "swimming-championship": {
    title: "Swimming Championship",
    date: "March 20, 2024",
    time: "2:00 PM",
    location: "Aquatic Center",
    description:
      "Regional swimming championship with multiple categories and age groups. Professional timing and judging with Olympic-standard pool facilities.",
    requirements: "Swimming certification, proper swimwear, goggles, swim cap",
    prizes:
      "Medals for top 3 in each category, Overall champion receives $1000",
    contact: "swimming@athlon-one.com",
    participants: 45,
    maxParticipants: 100,
    registrationDeadline: "March 15, 2024",
    category: "Individual Sport",
    difficulty: "Intermediate to Advanced",
  },
};

const sportDetails = {
  basketball: {
    title: "Basketball",
    level: "Advanced",
    icon: "fas fa-basketball-ball",
    totalSessions: 24,
    winRate: 78,
    bestScore: "42 pts",
    averageScore: "28 pts",
    totalHours: 62.4,
    caloriesBurned: 4980,
    personalBests: 8,
    achievements: [
      {
        title: "Season High Score",
        description: "Scored 42 points in tournament",
        date: "2 days ago",
        icon: "fas fa-medal",
      },
      {
        title: "Consistency Streak",
        description: "10 consecutive training sessions",
        date: "1 week ago",
        icon: "fas fa-star",
      },
      {
        title: "Team MVP",
        description: "Most valuable player award",
        date: "2 weeks ago",
        icon: "fas fa-trophy",
      },
    ],
    recentActivities: [
      {
        date: "Today",
        activity: "Training session - 2.5 hours",
        stats: "210 calories burned",
      },
      {
        date: "Yesterday",
        activity: "Practice match - 1.8 hours",
        stats: "165 calories burned",
      },
      {
        date: "3 days ago",
        activity: "Tournament game - 2.2 hours",
        stats: "195 calories burned",
      },
      {
        date: "5 days ago",
        activity: "Team practice - 2.0 hours",
        stats: "180 calories burned",
      },
      {
        date: "1 week ago",
        activity: "Skills training - 1.5 hours",
        stats: "140 calories burned",
      },
    ],
    personalBestsList: {
      "Most Points": "42 pts (March 5, 2024)",
      "Best Shooting %": "85% (February 20, 2024)",
      "Most Assists": "12 assists (March 1, 2024)",
      "Longest Streak": "8 games won",
    },
  },
  swimming: {
    title: "Swimming",
    level: "Intermediate",
    icon: "fas fa-swimmer",
    totalSessions: 18,
    totalDistance: "45km",
    bestTime: "2:15",
    averageTime: "2:28",
    totalHours: 46.8,
    caloriesBurned: 3240,
    personalBests: 6,
    achievements: [
      {
        title: "Distance Champion",
        description: "Completed 2.5km continuous swim",
        date: "3 days ago",
        icon: "fas fa-medal",
      },
      {
        title: "Speed Improvement",
        description: "Personal best time of 2:15",
        date: "1 week ago",
        icon: "fas fa-stopwatch",
      },
    ],
    recentActivities: [
      {
        date: "Today",
        activity: "Technique training - 1.5 hours",
        stats: "180 calories burned",
      },
      {
        date: "2 days ago",
        activity: "Distance swim - 2.0 hours",
        stats: "240 calories burned",
      },
      {
        date: "4 days ago",
        activity: "Speed training - 1.2 hours",
        stats: "145 calories burned",
      },
      {
        date: "6 days ago",
        activity: "Endurance session - 1.8 hours",
        stats: "210 calories burned",
      },
      {
        date: "1 week ago",
        activity: "Time trial - 1.0 hour",
        stats: "120 calories burned",
      },
    ],
    personalBestsList: {
      "Fastest 100m": "2:15 (February 28, 2024)",
      "Longest Distance": "2.5km (March 7, 2024)",
      "Best Technique": "Freestyle (March 10, 2024)",
      "Most Laps": "80 laps (March 5, 2024)",
    },
  },
  running: {
    title: "Running",
    level: "Beginner",
    icon: "fas fa-running",
    totalRuns: 12,
    totalDistance: "85km",
    bestPace: "5:30/km",
    averagePace: "6:15/km",
    totalHours: 31.2,
    caloriesBurned: 2550,
    personalBests: 4,
    achievements: [
      {
        title: "First 10K",
        description: "Completed first 10K run",
        date: "5 days ago",
        icon: "fas fa-medal",
      },
      {
        title: "Consistency Award",
        description: "5 consecutive running days",
        date: "1 week ago",
        icon: "fas fa-calendar-check",
      },
    ],
    recentActivities: [
      {
        date: "Today",
        activity: "Morning jog - 45 minutes",
        stats: "320 calories burned",
      },
      {
        date: "Yesterday",
        activity: "Interval training - 30 minutes",
        stats: "280 calories burned",
      },
      {
        date: "3 days ago",
        activity: "Long run - 1.2 hours",
        stats: "450 calories burned",
      },
      {
        date: "5 days ago",
        activity: "Easy pace run - 40 minutes",
        stats: "300 calories burned",
      },
      {
        date: "1 week ago",
        activity: "Speed work - 35 minutes",
        stats: "290 calories burned",
      },
    ],
    personalBestsList: {
      "Fastest 5K": "27:30 (March 8, 2024)",
      "Longest Run": "12km (March 6, 2024)",
      "Best Pace": "5:30/km (March 8, 2024)",
      "Most Consistent": "5 days streak (March 1-5, 2024)",
    },
  },
  cycling: {
    title: "Cycling",
    level: "Intermediate",
    icon: "fas fa-bicycle",
    totalRides: 8,
    totalDistance: "120km",
    bestSpeed: "35 km/h",
    averageSpeed: "28 km/h",
    totalHours: 15.6,
    caloriesBurned: 1560,
    personalBests: 3,
    achievements: [
      {
        title: "Speed Demon",
        description: "Reached 35 km/h top speed",
        date: "4 days ago",
        icon: "fas fa-tachometer-alt",
      },
      {
        title: "Distance Rider",
        description: "Completed 25km single ride",
        date: "1 week ago",
        icon: "fas fa-road",
      },
    ],
    recentActivities: [
      {
        date: "Today",
        activity: "Hill training - 1.5 hours",
        stats: "180 calories burned",
      },
      {
        date: "3 days ago",
        activity: "Speed session - 1.2 hours",
        stats: "150 calories burned",
      },
      {
        date: "5 days ago",
        activity: "Endurance ride - 2.0 hours",
        stats: "240 calories burned",
      },
      {
        date: "1 week ago",
        activity: "Recovery ride - 1.0 hour",
        stats: "100 calories burned",
      },
      {
        date: "10 days ago",
        activity: "Long distance - 2.5 hours",
        stats: "300 calories burned",
      },
    ],
    personalBestsList: {
      "Top Speed": "35 km/h (March 8, 2024)",
      "Longest Ride": "25km (March 5, 2024)",
      "Best Average": "32 km/h (March 3, 2024)",
      "Most Elevation": "500m climb (February 28, 2024)",
    },
  },
};

const weeklyTrendsData = {
  training: {
    label: "Training Hours",
    data: [4.2, 5.1, 3.8, 6.2, 4.8, 4.1, 4.5],
    total: "32 hours",
    unit: "h",
    change: "+12% from last week",
  },
  calories: {
    label: "Calories Burned",
    data: [420, 510, 380, 620, 480, 410, 450],
    total: "3,270 cal",
    unit: "cal",
    change: "+8% from last week",
  },
  heartrate: {
    label: "Avg Heart Rate",
    data: [138, 145, 132, 152, 140, 135, 142],
    total: "142 BPM",
    unit: "BPM",
    change: "Optimal range",
  },
};

function animateStatCounter(element, finalValue, duration) {
  let startValue = 0;
  const increment = Math.ceil(finalValue / (duration / 100));
  const timer = setInterval(() => {
    startValue += increment;
    element.textContent = startValue.toLocaleString();
    if (startValue >= finalValue) {
      clearInterval(timer);
      element.textContent = finalValue.toLocaleString();
    }
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  // Page entrance animation
  document.body.style.transform = "translateX(100%)";
  document.body.style.transition =
    "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transform = "translateX(0)";
    document.body.style.opacity = "1";
  }, 100);

  // Navigation functionality
  const navItems = document.querySelectorAll(".nav-item");
  const contentSections = document.querySelectorAll(".content-section");

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const currentActiveSection = document.querySelector(
        ".content-section.active"
      );
      if (currentActiveSection) {
        currentActiveSection.style.transform = "translateX(-50px)";
        currentActiveSection.style.opacity = "0";
        currentActiveSection.style.transition =
          "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      }

      setTimeout(() => {
        navItems.forEach((nav) => nav.classList.remove("active"));
        contentSections.forEach((section) =>
          section.classList.remove("active")
        );

        this.classList.add("active");

        const sectionId = this.getAttribute("data-section");
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.classList.add("active");
          targetSection.style.transform = "translateX(50px)";
          targetSection.style.opacity = "0";
          targetSection.style.transition =
            "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

          setTimeout(() => {
            targetSection.style.transform = "translateX(0)";
            targetSection.style.opacity = "1";
          }, 50);
        }
      }, 200);
    });
  });

  // Logo click for logout
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", () => {
      confirmLogout();
    });
  }

  // Animate overview cards on load
  const overviewCards = document.querySelectorAll(".overview-card");
  overviewCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 100);
    }, index * 100);
  });

  // Animate analytics metrics
  const analyticsMetrics = document.querySelectorAll(".metric-value");
  analyticsMetrics.forEach((metric, index) => {
    const finalValue = Number.parseInt(metric.textContent.replace(/,/g, ""));
    if (!isNaN(finalValue)) {
      setTimeout(() => {
        animateStatCounter(metric, finalValue, 1500 + index * 300);
      }, 500 + index * 200);
    }
  });

  // Performance Chart (Simple Canvas Implementation)
  const canvas = document.getElementById("performanceChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const data = [65, 78, 82, 88, 92, 85, 90];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    drawChart(ctx, data, labels, canvas.width, canvas.height);
  }

  const weeklyCanvas = document.getElementById("weeklyChart");
  if (weeklyCanvas) {
    const ctx = weeklyCanvas.getContext("2d");
    weeklyCanvas.width = weeklyCanvas.offsetWidth;
    weeklyCanvas.height = 250;

    const weeklyData = [72, 85, 78, 92, 88, 95, 89];
    const weeklyLabels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
    ];

    drawChart(
      ctx,
      weeklyData,
      weeklyLabels,
      weeklyCanvas.width,
      weeklyCanvas.height
    );
  }

  // Animate performance stats
  const performanceStats = document.querySelectorAll(".stat-value");
  performanceStats.forEach((stat, index) => {
    const finalValue = Number.parseInt(stat.textContent.replace(/,/g, ""));
    if (!isNaN(finalValue)) {
      animateStatCounter(stat, finalValue, 2000 + index * 200);
    }
  });

  const sportDetailsButtons = document.querySelectorAll(".sport-details-btn");
  sportDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sportType = this.getAttribute("data-sport");
      viewSportDetails(sportType);
    });
  });

  const trendTabs = document.querySelectorAll(".trend-tab");
  trendTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const trendType = this.getAttribute("data-trend");
      switchTrendView(trendType);
    });
  });

  // Initialize weekly trends
  updateWeeklyTrends("training");

  // Calendar functionality
  const currentMonthElement = document.getElementById("currentMonth");
  const calendarGrid = document.getElementById("calendarGrid");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  if (currentMonthElement && calendarGrid) {
    updateCalendar();

    prevMonthBtn?.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
    });

    nextMonthBtn?.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
    });
  }

  // Settings functionality
  const profileNameInput = document.getElementById("profileName");
  const userNameSpan = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");

  if (profileNameInput && userNameSpan) {
    profileNameInput.addEventListener("input", function () {
      userNameSpan.textContent = this.value || "Athlete";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", confirmLogout);
  }

  // News feed auto-scroll
  const newsFeed = document.querySelector(".news-feed");
  if (newsFeed) {
    setInterval(() => {
      if (newsFeed.scrollTop + newsFeed.clientHeight >= newsFeed.scrollHeight) {
        newsFeed.scrollTop = 0;
      } else {
        newsFeed.scrollTop += 1;
      }
    }, 50);
  }

  // Personal Information Edit Functions
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fieldName = this.getAttribute("data-field");
      editField(fieldName);
    });
  });

  const saveButtons = document.querySelectorAll(".save-btn");
  saveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fieldName = this.getAttribute("data-field");
      saveField(fieldName);
    });
  });

  const cancelButtons = document.querySelectorAll(".cancel-btn");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fieldName = this.getAttribute("data-field");
      cancelEdit(fieldName);
    });
  });

  // Password Modal Functions
  const passwordModalBtn = document.getElementById("passwordModalBtn");
  if (passwordModalBtn) {
    passwordModalBtn.addEventListener("click", openPasswordModal);
  }

  const closePasswordModalBtn = document.getElementById("closePasswordModal");
  if (closePasswordModalBtn) {
    closePasswordModalBtn.addEventListener("click", closePasswordModal);
  }

  const closePasswordModalBtnFooter = document.getElementById(
    "closePasswordModalBtnFooter"
  );
  if (closePasswordModalBtnFooter) {
    closePasswordModalBtnFooter.addEventListener("click", closePasswordModal);
  }

  const changePasswordBtn = document.getElementById("changePasswordBtn");
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", changePassword);
  }

  // Forgot Password Modal Functions
  const forgotPasswordModalBtn = document.getElementById(
    "forgotPasswordModalBtn"
  );
  if (forgotPasswordModalBtn) {
    forgotPasswordModalBtn.addEventListener("click", openForgotPasswordModal);
  }

  const closeForgotPasswordModalBtn = document.getElementById(
    "closeForgotPasswordModal"
  );
  if (closeForgotPasswordModalBtn) {
    closeForgotPasswordModalBtn.addEventListener(
      "click",
      closeForgotPasswordModal
    );
  }

  const closeForgotPasswordModalBtnFooter = document.getElementById(
    "closeForgotPasswordModalBtnFooter"
  );
  if (closeForgotPasswordModalBtnFooter) {
    closeForgotPasswordModalBtnFooter.addEventListener(
      "click",
      closeForgotPasswordModal
    );
  }

  const sendResetEmailBtn = document.getElementById("sendResetEmailBtn");
  if (sendResetEmailBtn) {
    sendResetEmailBtn.addEventListener("click", sendResetEmail);
  }

  // Enhanced Event Join/Unjoin functionality
  const eventButtons = document.querySelectorAll(".event-actions button");
  eventButtons.forEach((button) => {
    if (button.classList.contains("join-btn")) {
      button.addEventListener("click", function () {
        toggleEventJoin(this);
      });
    }
    if (button.classList.contains("view-details-btn")) {
      button.addEventListener("click", function () {
        const eventId = this.getAttribute("data-event");
        viewEventDetails(eventId);
      });
    }
  });

  const unjoinModalConfirmBtn = document.getElementById(
    "unjoinModalConfirmBtn"
  );
  if (unjoinModalConfirmBtn) {
    unjoinModalConfirmBtn.addEventListener("click", confirmUnjoin);
  }

  const unjoinModalCancelBtn = document.getElementById("unjoinModalCancelBtn");
  if (unjoinModalCancelBtn) {
    unjoinModalCancelBtn.addEventListener("click", closeUnjoinModal);
  }

  // Enhanced Event Details Modal Functions
  const closeEventDetails = document.getElementById("closeEventDetails");
  if (closeEventDetails) {
    closeEventDetails.addEventListener("click", closeEventDetailsModal);
  }

  const closeEventDetailsBtn = document.getElementById("closeEventDetailsBtn");
  if (closeEventDetailsBtn) {
    closeEventDetailsBtn.addEventListener("click", closeEventDetailsModal);
  }

  const closeSportDetails = document.getElementById("closeSportDetails");
  if (closeSportDetails) {
    closeSportDetails.addEventListener("click", closeSportDetailsModal);
  }

  const closeSportDetailsBtn = document.getElementById("closeSportDetailsBtn");
  if (closeSportDetailsBtn) {
    closeSportDetailsBtn.addEventListener("click", closeSportDetailsModal);
  }

  // Enhanced modal action buttons
  const joinEventFromModal = document.getElementById("joinEventFromModal");
  if (joinEventFromModal) {
    joinEventFromModal.addEventListener("click", () => {
      joinEventFromModalAction(currentEventId);
    });
  }

  // Delete Account functionality
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", confirmDeleteAccount);
  }
});

function viewSportDetails(sportType) {
  const modal = document.getElementById("sportDetailsModal");
  const titleElement = document.getElementById("sportDetailsTitle");
  const contentElement = document.getElementById("sportDetailsContent");

  if (modal && titleElement && contentElement && sportDetails[sportType]) {
    const sport = sportDetails[sportType];

    titleElement.textContent = `${sport.title} Details`;

    contentElement.innerHTML = `
      <div class="sport-overview">
        <div class="sport-icon-large">
          <i class="${sport.icon}"></i>
        </div>
        <div class="sport-basic-info">
          <h4 id="sportModalName">${sport.title}</h4>
          <p id="sportModalLevel">Level: ${sport.level}</p>
          <div class="sport-badges">
            <span class="badge active">Active</span>
            <span class="badge favorite">Favorite</span>
          </div>
        </div>
      </div>

      <div class="sport-detailed-stats">
        <div class="stats-grid">
          <div class="detailed-stat">
            <div class="stat-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Sessions</span>
              <span class="stat-value">${
                sport.totalSessions || sport.totalRuns || sport.totalRides
              }</span>
              <span class="stat-change">+3 this month</span>
            </div>
          </div>
          <div class="detailed-stat">
            <div class="stat-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Hours</span>
              <span class="stat-value">${sport.totalHours}</span>
              <span class="stat-change">+8.2h this month</span>
            </div>
          </div>
          <div class="detailed-stat">
            <div class="stat-icon">
              <i class="fas fa-fire"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Calories Burned</span>
              <span class="stat-value">${sport.caloriesBurned.toLocaleString()}</span>
              <span class="stat-change">+420 this month</span>
            </div>
          </div>
          <div class="detailed-stat">
            <div class="stat-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">Personal Bests</span>
              <span class="stat-value">${sport.personalBests}</span>
              <span class="stat-change">+2 this month</span>
            </div>
          </div>
        </div>
      </div>

      <div class="sport-achievements">
        <h5>Recent Achievements</h5>
        <div class="achievements-list">
          ${sport.achievements
            .map(
              (achievement) => `
            <div class="achievement-item">
              <i class="${achievement.icon} achievement-icon"></i>
              <div class="achievement-info">
                <span class="achievement-title">${achievement.title}</span>
                <span class="achievement-desc">${achievement.description}</span>
                <span class="achievement-date">${achievement.date}</span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="sport-recent-activity">
        <h5>Recent Activity</h5>
        <div class="activity-timeline">
          ${sport.recentActivities
            .map(
              (activity) => `
            <div class="activity-item">
              <div class="activity-date">${activity.date}</div>
              <div class="activity-desc">${activity.activity}</div>
              <div class="activity-stats">${activity.stats}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    modal.style.display = "block";

    // Add entrance animation
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "scale(0.9) translateY(-20px)";
    modalContent.style.opacity = "0";

    setTimeout(() => {
      modalContent.style.transform = "scale(1) translateY(0)";
      modalContent.style.opacity = "1";
      modalContent.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }, 50);
  }
}

function closeSportDetailsModal() {
  const modal = document.getElementById("sportDetailsModal");
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "scale(0.9) translateY(-20px)";
    modalContent.style.opacity = "0";

    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  }
}

function switchTrendView(trendType) {
  const tabs = document.querySelectorAll(".trend-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const activeTab = document.querySelector(`[data-trend="${trendType}"]`);
  if (activeTab) {
    activeTab.classList.add("active");
  }

  updateWeeklyTrends(trendType);
}

function updateWeeklyTrends(trendType) {
  const trendData = weeklyTrendsData[trendType];
  if (!trendData) return;

  const chartTotal = document.getElementById("weeklyTotal");
  const weeklyBars = document.getElementById("weeklyBars");

  if (chartTotal) {
    chartTotal.textContent = trendData.total;
  }

  if (weeklyBars) {
    const maxValue = Math.max(...trendData.data);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    weeklyBars.innerHTML = trendData.data
      .map((value, index) => {
        const height = Math.max((value / maxValue) * 100, 10); // Minimum 10% height for visibility
        const isToday = index === 6; // Sunday is today for demo
        return `
        <div class="bar-item">
          <div class="bar ${
            isToday ? "today" : ""
          }" style="height: ${height}%" title="${days[index]}: ${value}${
          trendData.unit
        }"></div>
          <span class="bar-label">${days[index]}</span>
          <span class="bar-value">${value}${trendData.unit}</span>
        </div>
      `;
      })
      .join("");
  }

  // Update chart period info
  const chartPeriod = document.querySelector(".chart-period");
  if (chartPeriod) {
    chartPeriod.textContent = `Last 7 Days - ${trendData.change}`;
  }
}

function viewEventDetails(eventId) {
  const modal = document.getElementById("eventDetailsModal");
  const titleElement = document.getElementById("eventDetailsTitle");
  const contentElement = document.getElementById("eventDetailsContent");

  if (modal && titleElement && contentElement && eventDetails[eventId]) {
    const event = eventDetails[eventId];
    currentEventId = eventId;

    titleElement.textContent = event.title;

    contentElement.innerHTML = `
      <div class="event-detail-item">
        <strong>📅 Date & Time</strong>
        <div style="font-size: 1.1rem; color: #0b3d2e; font-weight: 600;">${
          event.date
        } at ${event.time}</div>
      </div>
      <div class="event-detail-item">
        <strong>📍 Location</strong>
        <div style="color: #495057;">${event.location}</div>
      </div>
      <div class="event-detail-item">
        <strong>📝 Description</strong>
        <div style="color: #495057; line-height: 1.6;">${
          event.description
        }</div>
      </div>
      <div class="event-detail-item">
        <strong>👥 Participants</strong>
        <div style="margin-top: 0.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="color: #495057;">${event.participants} of ${
      event.maxParticipants
    } registered</span>
            <span style="color: #32cd32; font-weight: 600;">${Math.round(
              (event.participants / event.maxParticipants) * 100
            )}%</span>
          </div>
          <div style="background: #e9ecef; height: 12px; border-radius: 6px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #32cd32, #228b22); height: 100%; width: ${
              (event.participants / event.maxParticipants) * 100
            }%; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 6px;"></div>
          </div>
        </div>
      </div>
      <div class="event-detail-item">
        <strong>✅ Requirements</strong>
        <div style="color: #495057;">${event.requirements}</div>
      </div>
      <div class="event-detail-item">
        <strong>🏆 Prizes</strong>
        <div style="color: #495057;">${event.prizes}</div>
      </div>
      <div class="event-detail-item">
        <strong>⏰ Registration Deadline</strong>
        <div style="color: #dc3545; font-weight: 600;">${
          event.registrationDeadline
        }</div>
      </div>
      <div class="event-detail-item">
        <strong>📊 Event Details</strong>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
          <span style="background: rgba(50, 205, 50, 0.1); color: #0b3d2e; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">${
            event.category
          }</span>
          <span style="background: rgba(255, 193, 7, 0.1); color: #856404; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">${
            event.difficulty
          }</span>
        </div>
      </div>
      <div class="event-detail-item">
        <strong>📧 Contact Information</strong>
        <div style="color: #495057;">
          <a href="mailto:${
            event.contact
          }" style="color: #32cd32; text-decoration: none; font-weight: 500;">${
      event.contact
    }</a>
        </div>
      </div>
    `;

    modal.style.display = "block";

    // Add entrance animation
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "scale(0.9) translateY(-20px)";
    modalContent.style.opacity = "0";

    setTimeout(() => {
      modalContent.style.transform = "scale(1) translateY(0)";
      modalContent.style.opacity = "1";
      modalContent.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }, 50);
  }
}

function closeEventDetailsModal() {
  const modal = document.getElementById("eventDetailsModal");
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.transform = "scale(0.9) translateY(-20px)";
    modalContent.style.opacity = "0";

    setTimeout(() => {
      modal.style.display = "none";
      currentEventId = null;
    }, 400);
  }
}

function joinEventFromModalAction(eventId) {
  if (eventId && eventDetails[eventId]) {
    const event = eventDetails[eventId];
    const joinButton = document.getElementById("joinEventFromModal");

    if (joinButton) {
      joinButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Joining...';
      joinButton.disabled = true;
    }

    setTimeout(() => {
      showNotification(`🎉 Successfully joined ${event.title}!`, "success");

      // Update participant count
      event.participants += 1;

      // Update the modal content
      viewEventDetails(eventId);

      // Find and update the corresponding join button in the main dashboard
      const joinButtons = document.querySelectorAll(".join-btn");
      joinButtons.forEach((button) => {
        const eventItem = button.closest(".event-item");
        if (
          eventItem &&
          eventItem.querySelector("h4").textContent === event.title
        ) {
          button.innerHTML = '<i class="fas fa-check"></i> Joined';
          button.classList.remove("btn-primary");
          button.classList.add("joined-state");
        }
      });

      // Reset button state
      if (joinButton) {
        joinButton.innerHTML = '<i class="fas fa-check"></i> Joined';
        joinButton.classList.remove("btn-primary");
        joinButton.classList.add("joined-state");
        joinButton.disabled = false;
      }
    }, 1000);
  }
}

function toggleEventJoin(button) {
  const eventName = button
    .closest(".event-item")
    .querySelector("h4").textContent;
  const isJoined = button.classList.contains("joined-state");

  if (isJoined) {
    currentUnjoinButton = button;
    const modal = document.getElementById("unjoinModal");
    const eventNameElement = document.getElementById("unjoinEventName");

    if (modal && eventNameElement) {
      eventNameElement.textContent = eventName;
      modal.style.display = "block";
    }
  } else {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Joined';
      button.classList.remove("btn-primary");
      button.classList.add("joined-state");
      button.disabled = false;
      showNotification(`🎉 Successfully joined ${eventName}!`, "success");

      // Update participant count in event details
      Object.keys(eventDetails).forEach((key) => {
        if (eventDetails[key].title === eventName) {
          eventDetails[key].participants += 1;
        }
      });
    }, 1000);
  }
}

function closeUnjoinModal() {
  const modal = document.getElementById("unjoinModal");
  if (modal) {
    modal.style.display = "none";
  }
  currentUnjoinButton = null;
}

function confirmUnjoin() {
  if (currentUnjoinButton) {
    const eventName = currentUnjoinButton
      .closest(".event-item")
      .querySelector("h4").textContent;

    currentUnjoinButton.innerHTML = "Join";
    currentUnjoinButton.classList.remove("joined-state");
    currentUnjoinButton.classList.add("btn-primary");
    currentUnjoinButton.disabled = false;
    showNotification(`You have left ${eventName}`);

    closeUnjoinModal();

    // Update participant count in event details
    Object.keys(eventDetails).forEach((key) => {
      if (
        eventDetails[key].title === eventName &&
        eventDetails[key].participants > 0
      ) {
        eventDetails[key].participants -= 1;
      }
    });
  }
}

// Personal Information Edit Functions
function editField(fieldName) {
  const displayElement = document.getElementById(
    `display${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const editElement = document.getElementById(
    `edit${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const inputElement = document.getElementById(
    `input${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );

  if (displayElement && editElement && inputElement) {
    displayElement.parentElement.style.display = "none";
    editElement.classList.remove("hidden");
    inputElement.focus();
  }
}

function saveField(fieldName) {
  const displayElement = document.getElementById(
    `display${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const editElement = document.getElementById(
    `edit${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const inputElement = document.getElementById(
    `input${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );

  if (displayElement && editElement && inputElement) {
    const newValue = inputElement.value.trim();

    if (newValue) {
      if (fieldName === "email" && !isValidEmail(newValue)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      if (fieldName === "phone" && !isValidPhone(newValue)) {
        showNotification("Please enter a valid phone number", "error");
        return;
      }

      displayElement.textContent = newValue;
      displayElement.parentElement.style.display = "flex";
      editElement.classList.add("hidden");

      if (fieldName === "name") {
        const userNameSpan = document.getElementById("userName");
        if (userNameSpan) {
          userNameSpan.textContent = newValue.split(" ")[0] || "Athlete";
        }
      }

      showNotification(
        `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } updated successfully!`
      );
    } else {
      showNotification("Field cannot be empty", "error");
    }
  }
}

function cancelEdit(fieldName) {
  const displayElement = document.getElementById(
    `display${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const editElement = document.getElementById(
    `edit${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );
  const inputElement = document.getElementById(
    `input${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`
  );

  if (displayElement && editElement && inputElement) {
    inputElement.value = displayElement.textContent;
    displayElement.parentElement.style.display = "flex";
    editElement.classList.add("hidden");
  }
}

// Password Modal Functions
function openPasswordModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) {
    modal.style.display = "block";
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  }
}

function closePasswordModal() {
  const modal = document.getElementById("passwordModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function changePassword() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification("Please fill in all password fields", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification("New passwords do not match", "error");
    return;
  }

  if (!isValidPassword(newPassword)) {
    showNotification("Password does not meet requirements", "error");
    return;
  }

  setTimeout(() => {
    showNotification("Password changed successfully!");
    closePasswordModal();
  }, 1000);
}

// Forgot Password Modal Functions
function openForgotPasswordModal() {
  const modal = document.getElementById("forgotPasswordModal");
  if (modal) {
    modal.style.display = "block";
    document.getElementById("resetEmail").value = "";
  }
}

function closeForgotPasswordModal() {
  const modal = document.getElementById("forgotPasswordModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function sendResetEmail() {
  const email = document.getElementById("resetEmail").value;

  if (!email) {
    showNotification("Please enter your email address", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  setTimeout(() => {
    showNotification("Password reset link sent to your email!");
    closeForgotPasswordModal();
  }, 1000);
}

function confirmLogout() {
  showNotification("Logging out...");

  document.body.style.transform = "translateX(-100%)";
  document.body.style.opacity = "0";
  document.body.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

// Enhanced delete account functionality
function confirmDeleteAccount() {
  const confirmed = confirm(
    "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
  );

  if (confirmed) {
    const doubleConfirm = confirm(
      "This is your final warning. Are you absolutely sure you want to delete your account?"
    );

    if (doubleConfirm) {
      showNotification(
        "Account deletion initiated. You will be logged out shortly.",
        "error"
      );

      setTimeout(() => {
        showNotification("Account deleted successfully.", "error");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }, 3000);
    }
  }
}

// Validation Helper Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Enhanced modal click outside to close
window.addEventListener("click", (event) => {
  const passwordModal = document.getElementById("passwordModal");
  const forgotPasswordModal = document.getElementById("forgotPasswordModal");
  const unjoinModal = document.getElementById("unjoinModal");
  const eventDetailsModal = document.getElementById("eventDetailsModal");
  const sportDetailsModal = document.getElementById("sportDetailsModal");

  if (event.target === passwordModal) {
    closePasswordModal();
  }

  if (event.target === forgotPasswordModal) {
    closeForgotPasswordModal();
  }

  if (event.target === unjoinModal) {
    closeUnjoinModal();
  }

  if (event.target === eventDetailsModal) {
    closeEventDetailsModal();
  }

  if (event.target === sportDetailsModal) {
    closeSportDetailsModal();
  }
});

function drawChart(ctx, data, labels, width, height) {
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "#0B3D2E";
  ctx.fillStyle = "#32CD32";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  const maxValue = Math.max(...data);
  const stepX = chartWidth / (data.length - 1);

  ctx.beginPath();
  data.forEach((value, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (value / maxValue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    ctx.fillRect(x - 3, y - 3, 6, 6);
  });
  ctx.stroke();

  ctx.fillStyle = "#0B3D2E";
  ctx.font = "12px Tilt Neon";
  ctx.textAlign = "center";

  labels.forEach((label, index) => {
    const x = padding + index * stepX;
    ctx.fillText(label, x, height - padding + 20);
  });
}

function updateCalendar() {
  const currentMonthElement = document.getElementById("currentMonth");
  const calendarGrid = document.getElementById("calendarGrid");

  if (!currentMonthElement || !calendarGrid) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentMonthElement.textContent = new Date(year, month).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  calendarGrid.innerHTML = "";

  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayHeaders.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.style.fontWeight = "bold";
    dayElement.style.textAlign = "center";
    dayElement.style.padding = "0.5rem";
    dayElement.style.background = "#0B3D2E";
    dayElement.style.color = "white";
    calendarGrid.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.style.padding = "0.5rem";
    calendarGrid.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.style.padding = "0.5rem";
    dayElement.style.textAlign = "center";
    dayElement.style.cursor = "pointer";
    dayElement.style.border = "1px solid #ddd";
    dayElement.style.transition = "background 0.3s ease";

    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      dayElement.style.background = "#32CD32";
      dayElement.style.color = "white";
    }

    dayElement.addEventListener("mouseenter", function () {
      if (this.style.background !== "rgb(50, 205, 50)") {
        this.style.background = "#f0f0f0";
      }
    });

    dayElement.addEventListener("mouseleave", function () {
      if (this.style.background !== "rgb(50, 205, 50)") {
        this.style.background = "";
      }
    });

    calendarGrid.appendChild(dayElement);
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.innerHTML = message;
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.background =
    type === "error"
      ? "linear-gradient(135deg, #dc3545, #c82333)"
      : "linear-gradient(135deg, #32cd32, #228b22)";
  notification.style.color = "white";
  notification.style.padding = "1rem 1.5rem";
  notification.style.borderRadius = "12px";
  notification.style.zIndex = "10000";
  notification.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
  notification.style.transform = "translateX(100%)";
  notification.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  notification.style.fontWeight = "600";
  notification.style.fontSize = "0.95rem";
  notification.style.maxWidth = "350px";
  notification.style.wordWrap = "break-word";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 4000);
}
