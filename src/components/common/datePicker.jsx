import React, { Component } from "react";
import DatePickerDialog from "material-ui/DatePicker/DatePickerDialog";
import { Button } from "react-bootstrap";
import { MuiThemeProvider } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { purpleA700 } from "material-ui/styles/colors";
import moment from "moment";
import styled from "styled-components";

const DatePickerDiv = styled.div`
  & i {
    size: 30px;
  }
  & button {
    position: relative;
    top: 32px;
  }
`;

let datePickerDialog;

/********** Need to find out how to change the color **********/
const materialTheme = getMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: purpleA700
      }
    }
  }
});

class DatePicker extends Component {
  openDatePicker() {
    datePickerDialog.show();
  }

  openDatePickerOnEnter(e) {
    if (e.key === "Enter") {
      this.openDatePicker();
    }
  }

  setDateReceived(date) {
    this.props.onChange(moment(date).format("DD/MM/YYYY"));
  }

  render() {
    const { initialDate, disableFuture } = this.props;
    const maxDate = disableFuture ? new Date() : null;
    return (
      <React.Fragment>
        <DatePickerDiv>
          <Button
            variant="light"
            onKeyUp={e => this.openDatePickerOnEnter(e)}
            onClick={() => this.openDatePicker()}
          >
            <i className="fa fa-calendar" />
          </Button>
        </DatePickerDiv>
        <MuiThemeProvider muiTheme={materialTheme}>
          <DatePickerDialog
            maxDate={maxDate}
            ref={r => (datePickerDialog = r)}
            /* Must provide firstDayOfWeek or rendering of calendar will be broken. */
            firstDayOfWeek={0}
            /* Don't close the dialog until the user presses 'Okay'. */
            autoOk={false}
            onAccept={date => this.setDateReceived(date)}
            initialDate={moment(initialDate, "DD-MM-YYYY").toDate()}
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default DatePicker;
