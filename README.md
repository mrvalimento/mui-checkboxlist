# mui-checkboxlist

This package is a checkbox list component based on Material-UI. This is designed for use with react and react-final-form.

  - It accepts an array of items to be listed for selection
  - Produces an array of selected items
  - Customizable in terms of style and function

Check out this [Live Demo](https://codesandbox.io/s/elastic-rain-j1euy).

### Usage

Your application must have the following packages installed, these are declared as peer dependencies and won't we installed automatically by installing this component:

  - @material-ui/core
  - @material-ui/icons
  - lodash

Install the actual package:

```sh
$ npm install mui-checkboxlist
```

Then you just need to import it into your React application:
```javascript
import { CheckboxLabelValueSelect, CheckboxValueSelect } from "mui-checkboxlist";

//Use **CheckboxLabelValueSelect** when passing items with the following structure:
const listItems_labelValue = [{
    label: "White"
    value: "#FFFFFF"
}];

//Use **CheckboxValueSelect** when passing plain strings:
const listItems_valueOnly = [ "white", ... ];
```

### Props & Features

| Props | Mandatory | Default | Description |
| ------ | ------ | ------ | ------ | 
| disabled | no | false | If set to true, checkboxes and textfields are disabled. |
| label | no | | Displays a label to describe the whole list.
| limit | no | | If present, it should container a number called 'max' which limits the selected items to the specified number and 'deleteLast' which when set to true, will uncheck the last checked item instead of the first. |
| listItems | yes | | Contains all the items available for selection. |
| onChange | yes | | This function will provide the updated selected values. Basic structure is (selectedItems) => {}, where selectedItems is an array. |
| searchBarLabel | no | | If provided, search bar will be displayed and its value will be the placeholder. |
| selectAllLabel | no | | If provided, a select/deselect-all checkbox labeled with the provided value will be displayed. Event if present but field 'limit' is also present, the selectAll checkbox will not display. |
| selectedItems | no | [] | Contains the initially selected items. |
| selectedItemsFirst | no | false | If set to true, selected items will be displayed on top of the list. Perfect for long lists. |
| statusBar | no | false | If provided, a status bar with the number of selected items will be displayed. |
| style | no |  | Class object that applies to the CheckboxListSelect component. |

### Todos
 - Write documentation for styling
 - Write tests

License
----

MIT

