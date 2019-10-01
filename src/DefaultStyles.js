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
      label: {
        textTransform: "capitalize",
        display: 'table-cell',
        verticalAlign: 'middle',
      }
    }
  };

  export default defaultStyle;
  