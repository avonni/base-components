### Magnifier and Magnifier Attributes

|               |                                                 |                                                                                                     |
| ------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Magnifier** | **Description**                                 | **Supported magnifier attributes**                                                                  |
| follow        | Display the zoomed area at the cursor position. | smoothMove, zoomFactor, zoomRatioHeight, zoomRatioWidth                                             |
| inner         | Display the zoomed area on the entire image.    | smoothMove, zoomFactor                                                                              |
| standard      | Display the zoomed area outside of the image.   | position, horizontalOffset, smoothMove, verticalOffset, zoomFactor, zoomRatioHeight, zoomRatioWidth |

|                  |          |                                                                                                                                                                                                                                            |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**         | **Type** | **Description**                                                                                                                                                                                                                            |
| horizontalOffset | number   | Horizontal offset of the magnifier.                                                                                                                                                                                                        |
| position         | string   | Position of the magnifier relatively to the image. If auto is selected, the magnifier position will depend on the value of the main `position` attribute.<br><br>Valid values include auto, left, right, top and bottom. Defaults to auto. |
| smoothMove       | boolean  | If true, the cursor is followed with a smoother transition. Defaults to false.                                                                                                                                                             |
| verticalOffset   | number   | Vertical offset of the magnifier.                                                                                                                                                                                                          |
| zoomFactor       | number   | Zoom factor, defining the intensity of the zoom. Defaults to 2.                                                                                                                                                                            |
| zoomRatioHeight  | number   | Height of the displayed zoom area. Defaults to 100.                                                                                                                                                                                        |
| zoomRatioWidth   | number   | Width of the displayed zoom area. Defaults to 100.                                                                                                                                                                                         |
