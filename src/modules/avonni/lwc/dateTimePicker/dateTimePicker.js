import { LightningElement, api } from 'lwc';

export default class DateTimePicker extends LightningElement {
    table;
    firstWeekDay;
    // QUESTIONS
    // Add a disabledDaysHours to be applied at all time?
    // Add the possibility to pick the duration of a time slot?

    // PSEUDOCODE --- visibility=week
    // Get today's date.
    // If today is not a Sunday (first day of the week), find the closest past Sunday and store it in firstWeekDay.
    // Generate the table:
    //   * The table starts at firstWeekDay.
    //   * Past days are automatically disabled.
    //   * Past hours are automatically disabled.
    //   * Given times (disabledDateTimes) are disabled.
    //
    // Format of table:
    // [{
    //     day: (date object),
    //     times: [{
    //         label: '08:00 AM'
    //     },
    //     {
    //         label: '08:30 AM',
    //         disabled: true
    //     },
    //     {
    //         label: '09:00 AM'
    //     }]
    // },
    // {
    //     day: (date object),
    //     disabled: true,
    //     times: [{
    //         label: '08:00 AM',
    //         disabled: true
    //     },
    //     {
    //         label: '08:30 AM',
    //         disabled: true
    //     },
    //     {
    //         label: '09:00 AM'
    //     }]
    // }]
    //

    // The table is re-computed each time the date is changed by the user.
    //   * If the user goes to next/previous week, firstWeekDay = firstWeekDay +/- 7 days
    //   * If the user picks a specific date with the date picker, calclulate the new firstWeekDay

    // Structure?
    @api disabledDateTimes = [
        {
            date: '04/03/2021',
            times: ['08:00', '07:00']
        }
    ];
}
