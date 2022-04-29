// const year = 2022;
const locale = 'us'

const numberOfMonths = [...Array(12).keys()]

const calendar = (year) => {
    let calendarMonth = [];
    numberOfMonths.map(numberOfMonth => {
        const date = new Date(year)
        let intl = new Intl.DateTimeFormat(locale, {
            month: 'long'
        })
        let nameOfMonths = intl.format(new Date(year, numberOfMonth))

        let numbersOfDays = new Date(year, numberOfMonth + 1, 0).getDate();

        let days = [];

        for (let i = 1; i <= numbersOfDays; i++) {
            days.push({
                number: i,
                events: [],
            });
        };

        calendarMonth.push({
            'year': year,
            'nameOfMonth': nameOfMonths,
            'numbersOfDays': numbersOfDays,
            'days': days,
        })
    })
    return calendarMonth;
}

console.log(calendar(2022));