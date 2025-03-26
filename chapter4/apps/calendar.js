const CalendarApp = {
    currentMonth: 3, // Avril (0 = Janvier)
    currentYear: 2024,
    events: {
        "2024-04-10": "14:00 - Réunion avec l'équipe",
        "2024-04-15": "Toute la journée - Anniversaire de Marie",
        "2024-04-20": "10:00 - Rendez-vous médical"
    },

    open: function() {
        document.getElementById("calendar-modal").style.display = "block";
        this.renderCalendar();
    },

    close: function() {
        document.getElementById("calendar-modal").style.display = "none";
    },

    prevMonth: function() {
        if (this.currentMonth > 3) {
            this.currentMonth--;
            this.renderCalendar();
        }
    },

    nextMonth: function() {
        if (this.currentMonth < 11) {
            this.currentMonth++;
            this.renderCalendar();
        }
    },

    renderCalendar: function() {
        const monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        const daysContainer = document.getElementById("calendar-days");
        const monthYearLabel = document.getElementById("month-year");

        monthYearLabel.textContent = monthNames[this.currentMonth] + " " + this.currentYear;

        daysContainer.innerHTML = "";

        let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        let totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        if (firstDay === 0) firstDay = 7;

        for (let i = 1; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            daysContainer.appendChild(emptyDiv);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayDiv = document.createElement("div");
            const dateKey = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            dayDiv.textContent = day;
            dayDiv.classList.add("day");

            if (this.events[dateKey]) {
                dayDiv.classList.add("has-event");
                dayDiv.onclick = () => this.showEvent(dateKey);
            }

            daysContainer.appendChild(dayDiv);
        }
    },

    showEvent: function(dateKey) {
        const eventModal = document.getElementById("event-modal");
        const eventTitle = document.getElementById("event-title");
        const eventDescription = document.getElementById("event-description");

        eventTitle.textContent = `Événement du ${dateKey}`;
        eventDescription.textContent = this.events[dateKey];

        eventModal.style.display = "block";
    },

    closeEvent: function() {
        document.getElementById("event-modal").style.display = "none";
    }
};

