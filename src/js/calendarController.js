const nextMonth = (currentMonth) => {
  if (currentMonth.nextElementSibling) {
    currentMonth.classList.toggle("hidden");
    currentMonth.removeAttribute("currentmonth");
    currentMonth.nextElementSibling.classList.toggle("hidden");
    currentMonth.nextElementSibling.setAttribute("currentmonth", "current");
  }
};

const previousMonth = (currentMonth) => {
  if (currentMonth.previousElementSibling) {
    currentMonth.classList.toggle("hidden");
    currentMonth.removeAttribute("currentmonth");
    currentMonth.previousElementSibling.classList.toggle("hidden");
    currentMonth.previousElementSibling.setAttribute("currentmonth", "current");
  }
};

export { nextMonth, previousMonth };
