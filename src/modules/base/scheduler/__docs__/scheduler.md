## Recurrence

| **Recurrence** | **Description**               | **Supported attributes**  |
| -------------- | ----------------------------- | ------------------------- |
| daily          | Repeat the event every day.   | interval                  |
| weekly         | Repeat the event every week.  | interval, weekdays        |
| monthly        | Repeat the event every month. | interval, sameDaySameWeek |
| yearly         | Repeat the event every year.  | interval                  |

| **Recurrence attribute** | **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| interval                 | number   | Repeat the event every interval of time. For example “Every 3 weeks”.                                                                                                                                                                                                                                                                                                    |
| sameDaySameWeek          | boolean  | If true, the event will be repeated every month, on the same occurrence of this week day. For example “Monthly, on the third Saturday”.                                                                                                                                                                                                                                  |
| weekdays                 | number[] | Array of days on which the event will be repeated. For example, repeat every week on Mondays and Thursdays.<br/>The days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.<br/>If weekdays is present, each occurrence of the event can only span on one day. Only the times of the from and to dates will be taken into account. |

## Palettes

| **Name**    | **Colors**                                                           |
| ----------- | -------------------------------------------------------------------- |
| Aurora      | `['#3296ed','#77b9f2','#9d53f2','#c398f5','#26aba4','#4ed4cd']`      |
| Bluegrass   | `['#c7f296','#94e7a8','#51d2bb','#27aab0','#116985','#053661']`      |
| Dusk        | `['#98c9f5','#bac6a4','#e0bc3d','#d49b08','#966002','#613102']`      |
| Fire        | `['#f5de98','#f5c066','#f59527','#d56613','#952f13','#610514']`      |
| Heat        | `['#c7f296','#d8e167','#e3c52c','#d19214','#934214','#610514']`      |
| Lake        | `['#98c9f5','#72c9bd','#44c972','#38ab3d','#4d6719','#613102']`      |
| Mineral     | `['#529ee0','#d9a6c2','#08916d','#f59b00','#006699','#f0e442']`      |
| Nightfall   | `['#faca9b','#ce86bc','#9232e0','#5d19d4','#2a2396','#053661']`      |
| Ocean       | `['#96f2a9','#64cfc6','#289ee3','#1c6bd0','#40308a','#61054f']`      |
| Pond        | `['#c398f5','#8593f5','#358aef','#0c7fc5','#0a6e67','#0a611b']`      |
| Sunrise     | `['#f5de98','#f5c062','#f59623','#ce6716','#762f3d','#300561']`      |
| Water       | `['#96F2EE', '#68CEEE', '#2D9CED', '#0E6ECE', '#073E92', '#051C61']` |
| Watermelon  | `['#f598a7','#f56580','#f4284e','#c11c2f','#5c3f22','#0a611b']`      |
| Wildflowers | `['#00a1e0','#16325c','#76ded9','#08a69e','#e2ce7d','#e69f00']`      |
