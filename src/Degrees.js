
export default function Degrees(props) {
  function toFahrenheit(event) {
    event.preventDefault();
  }

  return (
    <div className="Degrees">
      it is {props.temperature} °C |<a href="/" onClick={toFahrenheit}></a>
      °F in {props.city}
    </div>
  );
}
