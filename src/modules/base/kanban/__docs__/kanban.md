### Types and Type Attributes

| **Type**   | **Description**                                                                                                                                                                                                                                                       | **Supported type attributes**                                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| boolean    | Displays the checkbox input in read-only.                                                                                                                                                                                                                             | N/A                                                                                                                                                           |
| currency   | Displays a currency using lightning-formatted-number.                                                                                                                                                                                                                 | currencyCode, currencyDisplayAs, minimumIntegerDigits, minimumFractionDigits, <br/> maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits |
| date       | Displays a date and time based on the locale using lightning-formatted-date-time.                                                                                                                                                                                     | day, era, hour, hour12, minute, month, second, timeZone, timeZoneName, weekday, year                                                                          |
| date-local | Displays a date that is formatted based on the locale using lightning-formatted-date-time. <br/> To include a time value, use the date type instead. The value passed is assumed to be in the browser <br/> local time zone and there is no time zone transformation. | day, month year                                                                                                                                               |
| email      | Displays an email address using lightning-formatted-email.                                                                                                                                                                                                            | N/A                                                                                                                                                           |
| location   | Displays a latitude and longitude of a location using lightning-formatted-location.                                                                                                                                                                                   | latitude, longitude                                                                                                                                           |
| number     | Displays a number using lightning-formatted-number.                                                                                                                                                                                                                   | minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits                                        |
| percent    | Displays a percentage using lightning-formatted-number.                                                                                                                                                                                                               | Same as number type                                                                                                                                           |
| phone      | Displays a phone number using lightning-formatted-phone.                                                                                                                                                                                                              | N/A                                                                                                                                                           |
| text       | Displays text using lightning-formatted-text.                                                                                                                                                                                                                         | linkify                                                                                                                                                       |
| url        | Displays a URL using lightning-formatted-url.                                                                                                                                                                                                                         | label, target, tooltip                                                                                                                                        |