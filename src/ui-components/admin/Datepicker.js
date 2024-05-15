import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ startDate, setSequenceDate }) => {
    return (
        <DatePicker popperClassName="some-custom-class" className="w-full rounded border border-stroke py-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none"
            showIcon toggleCalendarOnIconClick selected={startDate} onChange={(date) => setSequenceDate(date)} showTimeSelect minDate={new Date()} />
    );
};

export default DatePickerComponent;
