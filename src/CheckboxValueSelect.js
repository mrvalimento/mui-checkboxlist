import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const defaultStyle = {
  root: {
    border: "1px solid lightgray",
    padding: "10px",
    borderRadius: "10px"
  },
  listLabel: {
    color: "#137cbd",
    fontWeight: "700",
    paddingBottom: "10px"
  },
  listSearchBarText: {
    root: {
      background: "black"
    },
    input: {
      color: "white"
    }
  },
  listContainer: {
    backgroundColor: "#eeeeee",
    padding: "10px",
    borderRadius: "0px 0px 5px 5px",
    height: "100px",
    overflow: "auto"
  },
  listItemCheckbox: {
    root: {
      "&:hover": {
        backgroundColor: "transparent"
      }
    },
    icon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5"
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)"
      }
    },
    checkedIcon: {
      backgroundColor: "#137cbd",
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      "input:hover ~ &": {
        backgroundColor: "#106ba3"
      }
    },
    label: {
      textTransform: "capitalize"
    }
  }
};

class CheckboxValueSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
      listItems: this.props.listItems,
      classes: this.props.style ? this.returnMergedStyle() : defaultStyle,
      label: this.props.label,
      selectedItems: this.props.selectedItems ? this.props.selectedItems : [],
      searchBarLabel: this.props.searchBarLabel,
      limit: this.props.limit,
      disabled: this.props.disabled,
      selectAllLabel: this.props.selectAllLabel,
      statusBar: this.props.statusBar,
      onChange: this.props.onChange,
      selectedItemsFirst: this.props.selectedItemsFirst
    };
  }

  returnMergedStyle() {
    const newMerge = _.merge(defaultStyle, this.props.style);
    return newMerge;
  }

  isChecked(item, selectedItems) {
    const valueFilter = _.filter(selectedItems, function(selectedItem) {
      return selectedItem === item;
    });
    return !_.isEmpty(valueFilter);
  }

  renderSearchBar(searchBarLabel) {
    const handleSearchChange = event => {
      this.setState({ searchKey: _.lowerCase(event.target.value) });
    };

    return (
      <TextField
        fullWidth
        placeholder={searchBarLabel}
        style={this.state.classes.listSearchBarText}
        value={this.state.searchKey ? this.state.searchKey : ""}
        onChange={handleSearchChange}        
        disabled={this.state.disabled}
        InputProps={
          !_.isNil(this.state.searchKey) && this.state.searchKey !== ""
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Clear search bar"
                      onClick={() => {
                        this.setState({ searchKey: null });
                      }}
                    >
                      <Close />
                    </IconButton>
                  </InputAdornment>
                )
              }
            : null
        }
      />
    );
  }

  renderSelectAll() {
    const { classes, selectedItems, listItems, selectAllLabel } = this.state;
    const handleSelectAllChange = event => {
      const {onChange} = this.state;
      if (event.target.checked) {
        this.setState({ selectedItems: _.clone(this.state.listItems) });
      } else {
        this.setState({ selectedItems: [] });
      }
      onChange(this.state.selectedItems);
    };

    return (
      <div style={classes.listItem}>
        <FormControlLabel
          control={
            <Checkbox
              style={classes.listItemCheckbox}
              disableRipple
              color="default"
              checked={_.isEqual(selectedItems, listItems)}
              onChange={handleSelectAllChange}
              disabled={this.state.disabled}
              checkedIcon={
                <span
                  style={Object.assign(
                    {},
                    classes.listItemCheckbox.icon,
                    classes.listItemCheckbox.checkedIcon
                  )}
                />
              }
              icon={<span style={classes.listItemCheckbox.icon} />}
            />
          }
          label={selectAllLabel}
        />
      </div>
    );
  }

  renderStatusBar() {
    const { selectedItems, limit } = this.state;
    let status = `${selectedItems.length} items ${
      selectedItems.length > 1 ? "are" : "is"
    } currently selected.`;
    if (limit) {
      status =
        status +
        ` You can only select ${limit.max} ${
          limit.max > 1 ? "items" : "item"
        }.`;
    }
    return status;
  }

  renderValueCheckbox(item) {
    const { classes, selectedItems } = this.state;
    const handleChange = item => event => {
      const { onChange, selectedItems, limit } = this.state;
      let newSelectedItems = selectedItems;
      if (event.target.checked) {
        if (limit && limit.max === newSelectedItems.length) {
          newSelectedItems.splice(limit.deleteLast ? limit.max - 1 : 0, 1);
        }
        newSelectedItems.push(item);
      } else {
        _.remove(newSelectedItems, function(listItem) {
          return item === listItem;
        });
      }
      this.setState({ selectedItems: newSelectedItems });
      onChange(newSelectedItems);
    };

    return (
      <div style={classes.listItem} key={`div-${item}`}>
        <FormControlLabel
          control={
            <Checkbox
              style={classes.listItemCheckbox}
              disableRipple
              color="default"
              checked={this.isChecked(item, selectedItems)}
              onChange={handleChange(item)}
              checkedIcon={
                <span
                  style={Object.assign(
                    {},
                    classes.listItemCheckbox.icon,
                    classes.listItemCheckbox.checkedIcon
                  )}
                />
              }
              icon={<span style={classes.listItemCheckbox.icon} />}
            />
          }
          style={classes.listItemCheckbox.label}
          label={item}
        />
      </div>
    );
  }

  renderCheckboxes() {
    const {
      selectedItems,
      listItems,
      searchKey,
      selectedItemsFirst
    } = this.state;

    const filteredListItems = _.orderBy(
      searchKey && searchKey !== ""
        ? _.filter(listItems, listItem => {
            return _.startsWith(_.lowerCase(listItem), searchKey);
          })
        : selectedItemsFirst && !_.isEmpty(selectedItems)
        ? _.filter(listItems, listItem => {
            return _.isNil(
              _.find(selectedItems, selectedItem => {
                return selectedItem === listItem;
              })
            );
          })
        : listItems
    );

    return (
      <React.Fragment>
        {selectedItemsFirst &&
          (_.isNil(searchKey) || searchKey === "") &&
          !_.isEmpty(selectedItems) &&
          _.orderBy(selectedItems).map(item => {
            return this.renderValueCheckbox(item);
          })}
        {filteredListItems.map(item => {
          return this.renderValueCheckbox(item);
        })}
      </React.Fragment>
    );
  }

  render() {
    const {
      classes,
      label,
      searchBarLabel,
      selectAllLabel,
      statusBar,
      limit
    } = this.state;

    return (
      <Grid container direction="row" alignItems="stretch" style={classes.root}>
        {label && (
          <Grid item xs={12} style={classes.listLabel}>
            {label}
          </Grid>
        )}
        {statusBar && (
          <Grid item xs={12} style={classes.listStatusBar}>
            {this.renderStatusBar()}
          </Grid>
        )}
        {searchBarLabel && (
          <Grid item xs={12} style={classes.listSearchBar}>
            {this.renderSearchBar(searchBarLabel)}
          </Grid>
        )}
        <Grid item xs={12} style={classes.listContainer}>
          {selectAllLabel && _.isNil(limit) && this.renderSelectAll()}
          {this.renderCheckboxes()}
        </Grid>
      </Grid>
    );
  }
}

CheckboxValueSelect.propTypes = {
  /**
   * Optional. If set to true, checkboxes and textfields are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Optional. Displays a label to describe the whole list.
   */
  label: PropTypes.string,
  /**
   * Optional. If present, it should container a number called 'max' which limits the selected items to the specified number and 'deleteLast' which when set to true, will uncheck the last checked item instead of the first.
   */
  limit: PropTypes.shape({
    max: PropTypes.number.isRequired,
    deleteLast: PropTypes.bool.isRequired
  }),
  /**
   * Required. Contains all the items available for selection.
   */
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Required. This function will provide the updated selected values. Basic structure is (selectedItems) => { //your function }, where selectedItems is an array.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Optional. If provided, search bar will be displayed and its value will be the placeholder.
   */
  searchBarLabel: PropTypes.string,
  /**
   * Optional. If provided, a select all tickbox will display with labeled with the provided value.
   */
  selectAllLabel: PropTypes.string,
  /**
   * Optional. Contains the initially selected items.
   */
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  /**
   * Optional. If set to true, selected items will be displayed on top of the list.
   */
  selectedItemsFirst: PropTypes.bool,
  /**
   * Optional. If provided, a status bar with the number of selected items will be displayed.
   */
  statusBar: PropTypes.bool,
  /**
   * Optional. Class object that applies to the CheckboxListSelect component.
   */
  style: PropTypes.object
};

CheckboxValueSelect.defaultProps = {
  disabled: false,
  selectAll: true
};

export default CheckboxValueSelect;
