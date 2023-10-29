import "../styles/Today.scss";

export default function Today() {
  return <h3 className="date">{new Date().toDateString()}</h3>;
}
